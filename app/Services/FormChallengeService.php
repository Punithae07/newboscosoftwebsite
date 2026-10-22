<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FormChallengeService
{
    public function issue(string $form, Request $request): array
    {
        $issuedAt = now()->getTimestampMs();
        $nonce = Str::random(40);

        return [
            'form' => $form,
            'issued_at' => $issuedAt,
            'nonce' => $nonce,
            'signature' => $this->signature($form, $issuedAt, $nonce, $request),
        ];
    }

    public function isValid(string $form, int $issuedAt, string $nonce, string $signature, Request $request): bool
    {
        return hash_equals($this->signature($form, $issuedAt, $nonce, $request), $signature);
    }

    private function signature(string $form, int $issuedAt, string $nonce, Request $request): string
    {
        $payload = implode('|', [
            $form,
            $issuedAt,
            $nonce,
            (string) $request->ip(),
            sha1($this->normalizeUserAgent($request->userAgent())),
        ]);

        return hash_hmac('sha256', $payload, (string) config('app.key'));
    }

    private function normalizeUserAgent(?string $userAgent): string
    {
        return Str::limit(Str::squish((string) $userAgent), 500, '');
    }
}
