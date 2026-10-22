<?php

namespace App\Http\Middleware;

use App\Services\FormSecurityService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProtectPublicFormSubmission
{
    public function __construct(private readonly FormSecurityService $formSecurity)
    {
    }

    public function handle(Request $request, Closure $next, string $form): Response
    {
        // Every public form passes through this reusable gate before controller validation,
        // persistence, or email delivery can happen.
        $this->formSecurity->protect($request, $form);

        return $next($request);
    }
}
