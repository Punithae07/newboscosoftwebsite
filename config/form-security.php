<?php

return [
    'provider' => env('FORM_CAPTCHA_PROVIDER', 'turnstile'),
    'minimum_submit_seconds' => (int) env('FORM_MINIMUM_SUBMIT_SECONDS', 5),
    'challenge_ttl_seconds' => (int) env('FORM_CHALLENGE_TTL_SECONDS', 7200),
    'require_ajax_headers_for_api_routes' => env('FORM_REQUIRE_AJAX_HEADERS', true),
    'allowed_hostnames' => (static function (): array {
        $configuredHosts = trim((string) env('FORM_CAPTCHA_ALLOWED_HOSTNAMES', ''));
        $hosts = $configuredHosts !== ''
            ? explode(',', $configuredHosts)
            : [(string) parse_url((string) env('APP_URL'), PHP_URL_HOST)];

        $variants = [];

        foreach ($hosts as $host) {
            $normalized = strtolower(trim((string) $host));

            if ($normalized === '') {
                continue;
            }

            $variants[] = $normalized;
            $variants[] = str_starts_with($normalized, 'www.')
                ? substr($normalized, 4)
                : 'www.'.$normalized;
        }

        return array_values(array_unique(array_filter($variants)));
    })(),
    'spam_keywords' => [
        'casino',
        'crypto',
        'loan',
        'viagra',
        'betting',
        'gambling',
        'forex',
    ],
    'turnstile' => [
        'site_key' => env('TURNSTILE_SITE_KEY'),
        'secret_key' => env('TURNSTILE_SECRET_KEY'),
    ],
    'recaptcha_v3' => [
        'site_key' => env('RECAPTCHA_SITE_KEY'),
        'secret_key' => env('RECAPTCHA_SECRET_KEY'),
        'minimum_score' => (float) env('RECAPTCHA_MIN_SCORE', 0.5),
    ],
    'forms' => [
        'contact' => [
            'label' => 'Contact Form',
            'captcha_action' => 'contact_submit',
            'rate_limit_per_hour' => 5,
            'spam_fields' => ['name', 'company', 'country', 'industry', 'product_interest', 'message'],
        ],
        'newsletter' => [
            'label' => 'Newsletter Form',
            'captcha_action' => 'newsletter_subscribe',
            'rate_limit_per_hour' => 3,
            'spam_fields' => ['email'],
        ],
        'brochure' => [
            'label' => 'Brochure Download Form',
            'captcha_action' => 'brochure_download',
            'rate_limit_per_hour' => 5,
            'spam_fields' => ['name', 'company', 'product_interest', 'message'],
        ],
    ],
];
