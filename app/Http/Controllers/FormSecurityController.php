<?php

namespace App\Http\Controllers;

use App\Services\FormSecurityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FormSecurityController
{
    public function __construct(private readonly FormSecurityService $formSecurity)
    {
    }

    public function challenge(Request $request, string $form): JsonResponse
    {
        return response()->json([
            'challenge' => $this->formSecurity->issueChallenge($form, $request),
            'captcha' => $this->formSecurity->publicConfig($form, $request),
            'minimum_submit_seconds' => (int) config('form-security.minimum_submit_seconds', 5),
        ])->header('Cache-Control', 'no-store, private');
    }
}
