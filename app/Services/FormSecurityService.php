<?php

namespace App\Services;

use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FormSecurityService
{
    public function __construct(
        private readonly CaptchaVerificationService $captcha,
        private readonly FormChallengeService $challenge,
        private readonly RateLimiter $rateLimiter,
    ) {}

    public function publicConfig(string $form, ?Request $request = null): array
    {
        $this->formConfig($form);

        return $this->captcha->publicConfig($form, $request?->getHost());
    }

    public function issueChallenge(string $form, Request $request): array
    {
        $this->formConfig($form);

        return $this->challenge->issue($form, $request);
    }

    public function protect(Request $request, string $form): void
    {
        $config = $this->formConfig($form);

        $this->ensureExpectedHeaders($request, $form, $config);
        $this->rejectFilledHoneypots($request, $form);
        $issuedAt = $this->validateChallenge($request, $form);
        $this->validateSubmissionTime($request, $form, $issuedAt);
        $this->enforceRateLimit($request, $form, $config);
        $this->rejectSpamPatterns($request, $form, $config);
        $this->verifyCaptcha($request, $form, $config);
    }

    private function ensureExpectedHeaders(Request $request, string $form, array $config): void
    {
        if (! $request->is('api/*') || ! config('form-security.require_ajax_headers_for_api_routes', true)) {
            return;
        }

        $ajaxHeader = (string) $request->header('X-Requested-With', '');
        $acceptHeader = Str::lower((string) $request->header('Accept', ''));

        if ($ajaxHeader !== 'XMLHttpRequest' || ! str_contains($acceptHeader, 'application/json')) {
            $this->reject($request, $form, 'Malformed submission headers.', 422);
        }
    }

    private function rejectFilledHoneypots(Request $request, string $form): void
    {
        foreach (['company_url', 'website', 'botcheck'] as $field) {
            if (filled($request->input($field))) {
                $this->reject($request, $form, 'Your submission was flagged as spam.', 422);
            }
        }
    }

    private function validateChallenge(Request $request, string $form): int
    {
        $issuedAt = (int) $request->input('form_issued_at');
        $nonce = trim((string) $request->input('form_nonce', ''));
        $signature = trim((string) $request->input('form_signature', ''));

        if ($issuedAt <= 0 || $nonce === '' || $signature === '') {
            $this->reject($request, $form, 'The form security challenge is missing or invalid.', 422);
        }

        if (! $this->challenge->isValid($form, $issuedAt, $nonce, $signature, $request)) {
            $this->reject($request, $form, 'The form security challenge could not be verified.', 422);
        }

        return $issuedAt;
    }

    private function validateSubmissionTime(Request $request, string $form, int $issuedAt): void
    {
        if ($this->shouldRelaxLocalProtections($request)) {
            return;
        }

        $now = now()->getTimestampMs();
        $elapsedMs = $now - $issuedAt;
        $minimumSeconds = max(1, (int) config('form-security.minimum_submit_seconds', 5));
        $ttlSeconds = max($minimumSeconds, (int) config('form-security.challenge_ttl_seconds', 7200));

        if ($elapsedMs < ($minimumSeconds * 1000)) {
            $this->reject($request, $form, 'Please take a moment before submitting the form.', 422);
        }

        if ($elapsedMs > ($ttlSeconds * 1000)) {
            $this->reject($request, $form, 'This form has expired. Please refresh the page and try again.', 422);
        }
    }

    private function enforceRateLimit(Request $request, string $form, array $config): void
    {
        $key = sprintf('form-security:%s:%s', $form, (string) $request->ip());
        $maxAttempts = max(1, (int) ($config['rate_limit_per_hour'] ?? 5));

        if ($this->rateLimiter->tooManyAttempts($key, $maxAttempts)) {
            $this->reject(
                $request,
                $form,
                'We have received too many submissions from this connection. Please wait a while and try again.',
                429,
                ['retry_after_seconds' => $this->rateLimiter->availableIn($key)]
            );
        }

        $this->rateLimiter->hit($key, 3600);
    }

    private function rejectSpamPatterns(Request $request, string $form, array $config): void
    {
        $fields = (array) ($config['spam_fields'] ?? []);
        $values = [];

        foreach ($fields as $field) {
            $value = trim((string) $request->input($field, ''));
            if ($value !== '') {
                $values[$field] = $value;
            }
        }

        if ($values === []) {
            return;
        }

        $combined = Str::lower(implode("\n", $values));

        foreach ((array) config('form-security.spam_keywords', []) as $keyword) {
            if ($keyword !== '' && preg_match('/\b'.preg_quote(Str::lower($keyword), '/').'\b/u', $combined)) {
                $this->reject($request, $form, 'Your submission looks like spam content and could not be accepted.', 422);
            }
        }

        if (preg_match_all('~(?:https?://|www\.)\S+~iu', $combined, $matches) > 2) {
            $this->reject($request, $form, 'Please reduce the number of links in your submission.', 422);
        }

        foreach ($values as $value) {
            if (preg_match('/<\/?[a-z][^>]*>/iu', $value)) {
                $this->reject($request, $form, 'HTML content is not allowed in this form.', 422);
            }

            if (preg_match('/(.)\1{6,}/u', $value)) {
                $this->reject($request, $form, 'Repeated characters are not allowed in this form.', 422);
            }

            if (preg_match('/(?:&#x?[0-9a-f]{2,};|%[0-9a-f]{2}){3,}/iu', $value)) {
                $this->reject($request, $form, 'Encoded or suspicious content was detected.', 422);
            }

            if (preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', $value)) {
                $this->reject($request, $form, 'Unsupported characters were detected in the form submission.', 422);
            }
        }
    }

    private function verifyCaptcha(Request $request, string $form, array $config): void
    {
        $captchaConfig = $this->captcha->publicConfig($form, $request->getHost());
        $siteKey = trim((string) ($captchaConfig['site_key'] ?? ''));
        $provider = (string) ($captchaConfig['provider'] ?? 'none');

        if ($provider === 'none') {
            Log::info('Public form captcha disabled for request host.', [
                'form' => $form,
                'host' => $request->getHost(),
            ]);

            return;
        }

        if ($siteKey === '') {
            if ($this->shouldRelaxLocalProtections($request)) {
                Log::info('Public form captcha skipped for local environment.', [
                    'form' => $form,
                    'host' => $request->getHost(),
                ]);

                return;
            }

            $this->reject($request, $form, 'Form security is not configured. Please contact the site administrator.', 503);
        }

        $result = $this->captcha->verify(
            $form,
            trim((string) $request->input('captcha_token', '')),
            (string) ($config['captcha_action'] ?? $form),
            (string) $request->getHost(),
            $request->ip(),
        );

        if (! ($result['ok'] ?? false)) {
            $this->reject($request, $form, (string) ($result['reason'] ?? 'Captcha verification failed.'), 422);
        }
    }

    private function shouldRelaxLocalProtections(Request $request): bool
    {
        $host = Str::lower(trim((string) $request->getHost()));

        return app()->environment(['local', 'testing'])
            || in_array($host, ['127.0.0.1', 'localhost'], true);
    }

    private function reject(Request $request, string $form, string $message, int $status, array $context = []): never
    {
        Log::warning('Public form submission rejected.', array_merge([
            'form' => $form,
            'ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
            'reason' => $message,
            'status' => $status,
            'rejected_at' => now()->toIso8601String(),
        ], $context));

        if ($request->expectsJson() || $request->is('api/*')) {
            throw new HttpResponseException(response()->json([
                'message' => $message,
            ], $status));
        }

        throw new HttpResponseException(
            redirect()->back()->withInput($request->except(['captcha_token', 'company_url', 'website', 'botcheck']))->withErrors([
                'form' => $message,
            ])
        );
    }

    private function formConfig(string $form): array
    {
        $config = (array) config("form-security.forms.{$form}", []);

        if ($config === []) {
            throw new \InvalidArgumentException("Unknown public form [{$form}].");
        }

        return $config;
    }
}
