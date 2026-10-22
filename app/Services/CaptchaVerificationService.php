<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class CaptchaVerificationService
{
    public function publicConfig(string $form, ?string $requestHostname = null): array
    {
        $provider = (string) config('form-security.provider', 'turnstile');
        $formConfig = $this->formConfig($form);
        $action = (string) ($formConfig['captcha_action'] ?? $form);

        if (! $this->shouldEnforceCaptcha($provider, $requestHostname)) {
            return $this->disabledPublicConfig($action);
        }

        return match ($provider) {
            'recaptcha_v3' => $this->recaptchaPublicConfig($action),
            'turnstile' => $this->turnstilePublicConfig($action),
            default => $this->disabledPublicConfig($action),
        };
    }

    public function verify(string $form, string $token, string $expectedAction, string $requestHostname, ?string $remoteIp = null): array
    {
        $provider = (string) config('form-security.provider', 'turnstile');

        if (! $this->shouldEnforceCaptcha($provider, $requestHostname)) {
            return ['ok' => true, 'reason' => 'Captcha verification bypassed by configuration.'];
        }

        if ($token === '') {
            return ['ok' => false, 'reason' => 'Captcha verification is required.'];
        }

        return match ($provider) {
            'recaptcha_v3' => $this->verifyRecaptchaV3($token, $expectedAction, $requestHostname, $remoteIp),
            'turnstile' => $this->verifyTurnstile($token, $expectedAction, $requestHostname, $remoteIp),
            default => ['ok' => true, 'reason' => 'Captcha verification bypassed by configuration.'],
        };
    }

    private function recaptchaPublicConfig(string $action): array
    {
        $siteKey = (string) config('form-security.recaptcha_v3.site_key', '');

        if ($siteKey === '') {
            return $this->disabledPublicConfig($action);
        }

        return [
            'provider' => 'recaptcha_v3',
            'site_key' => $siteKey,
            'action' => $action,
            'minimum_score' => (float) config('form-security.recaptcha_v3.minimum_score', 0.5),
        ];
    }

    private function turnstilePublicConfig(string $action): array
    {
        $siteKey = (string) config('form-security.turnstile.site_key', '');

        if ($siteKey === '') {
            return $this->disabledPublicConfig($action);
        }

        return [
            'provider' => 'turnstile',
            'site_key' => $siteKey,
            'action' => $action,
            'minimum_score' => null,
        ];
    }

    private function verifyRecaptchaV3(string $token, string $expectedAction, string $requestHostname, ?string $remoteIp): array
    {
        $secret = (string) config('form-security.recaptcha_v3.secret_key', '');
        $siteKey = (string) config('form-security.recaptcha_v3.site_key', '');

        if ($secret === '' || $siteKey === '') {
            return ['ok' => false, 'reason' => 'Captcha provider is not configured.'];
        }

        try {
            $response = Http::asForm()
                ->timeout(10)
                ->post('https://www.google.com/recaptcha/api/siteverify', array_filter([
                    'secret' => $secret,
                    'response' => $token,
                    'remoteip' => $remoteIp,
                ]));
        } catch (ConnectionException|\Throwable) {
            return ['ok' => false, 'reason' => 'Captcha verification could not be completed.'];
        }

        if (! $response->successful()) {
            return ['ok' => false, 'reason' => 'Captcha verification could not be completed.'];
        }

        $payload = $response->json();

        if (! is_array($payload) || ! ($payload['success'] ?? false)) {
            return ['ok' => false, 'reason' => 'Captcha verification failed.'];
        }

        if (! $this->hostnameIsAllowed((string) ($payload['hostname'] ?? ''), $requestHostname)) {
            return ['ok' => false, 'reason' => 'Captcha hostname validation failed.'];
        }

        if (($payload['action'] ?? '') !== $expectedAction) {
            return ['ok' => false, 'reason' => 'Captcha action validation failed.'];
        }

        if ((float) ($payload['score'] ?? 0) < (float) config('form-security.recaptcha_v3.minimum_score', 0.5)) {
            return ['ok' => false, 'reason' => 'Captcha score was too low.'];
        }

        return ['ok' => true];
    }

    private function verifyTurnstile(string $token, string $expectedAction, string $requestHostname, ?string $remoteIp): array
    {
        $secret = (string) config('form-security.turnstile.secret_key', '');
        $siteKey = (string) config('form-security.turnstile.site_key', '');

        if ($secret === '' || $siteKey === '') {
            return ['ok' => false, 'reason' => 'Captcha provider is not configured.'];
        }

        try {
            $response = Http::asForm()
                ->timeout(10)
                ->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', array_filter([
                    'secret' => $secret,
                    'response' => $token,
                    'remoteip' => $remoteIp,
                ]));
        } catch (ConnectionException|\Throwable) {
            return ['ok' => false, 'reason' => 'Captcha verification could not be completed.'];
        }

        if (! $response->successful()) {
            return ['ok' => false, 'reason' => 'Captcha verification could not be completed.'];
        }

        $payload = $response->json();

        if (! is_array($payload) || ! ($payload['success'] ?? false)) {
            return ['ok' => false, 'reason' => 'Captcha verification failed.'];
        }

        if (! $this->hostnameIsAllowed((string) ($payload['hostname'] ?? ''), $requestHostname)) {
            return ['ok' => false, 'reason' => 'Captcha hostname validation failed.'];
        }

        if (($payload['action'] ?? '') !== $expectedAction) {
            return ['ok' => false, 'reason' => 'Captcha action validation failed.'];
        }

        return ['ok' => true];
    }

    private function disabledPublicConfig(string $action): array
    {
        return [
            'provider' => 'none',
            'site_key' => '',
            'action' => $action,
            'minimum_score' => null,
        ];
    }

    private function shouldEnforceCaptcha(string $provider, ?string $requestHostname = null): bool
    {
        if ($provider === 'none') {
            return false;
        }

        if (! $this->hostIsAllowed($requestHostname)) {
            return false;
        }

        return match ($provider) {
            'recaptcha_v3' => (string) config('form-security.recaptcha_v3.site_key', '') !== ''
                && (string) config('form-security.recaptcha_v3.secret_key', '') !== '',
            'turnstile' => (string) config('form-security.turnstile.site_key', '') !== ''
                && (string) config('form-security.turnstile.secret_key', '') !== '',
            default => false,
        };
    }

    private function hostIsAllowed(?string $requestHostname): bool
    {
        $hostname = strtolower(trim((string) $requestHostname));

        if ($hostname === '') {
            return false;
        }

        $allowedHostnames = $this->allowedHostnames();

        if ($allowedHostnames === []) {
            return true;
        }

        foreach ($this->hostnameVariants($hostname) as $variant) {
            if (in_array($variant, $allowedHostnames, true)) {
                return true;
            }
        }

        return false;
    }

    private function hostnameIsAllowed(string $providerHostname, string $requestHostname): bool
    {
        $normalizedProviderHostname = strtolower(trim($providerHostname));
        $normalizedRequestHostname = strtolower(trim($requestHostname));

        if ($normalizedProviderHostname === '' || $normalizedRequestHostname === '') {
            return false;
        }

        $providerVariants = $this->hostnameVariants($normalizedProviderHostname);
        $requestVariants = $this->hostnameVariants($normalizedRequestHostname);

        if (count(array_intersect($providerVariants, $requestVariants)) === 0) {
            return false;
        }

        $allowedHostnames = $this->allowedHostnames();

        return $allowedHostnames === []
            || count(array_intersect($requestVariants, $allowedHostnames)) > 0;
    }

    private function hostnameVariants(string $hostname): array
    {
        $normalized = strtolower(trim($hostname));

        if ($normalized === '') {
            return [];
        }

        $variants = [$normalized];

        if (str_starts_with($normalized, 'www.')) {
            $variants[] = substr($normalized, 4);
        } else {
            $variants[] = 'www.'.$normalized;
        }

        return array_values(array_unique(array_filter($variants)));
    }

    private function allowedHostnames(): array
    {
        $configured = (array) config('form-security.allowed_hostnames', []);

        return array_values(array_unique(array_filter(array_map(
            static fn (string $hostname): string => strtolower(trim($hostname)),
            $configured
        ))));
    }

    private function formConfig(string $form): array
    {
        return (array) config("form-security.forms.{$form}", []);
    }
}
