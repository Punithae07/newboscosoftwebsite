<?php

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(\App\Http\Middleware\AddSecurityHeaders::class);
        $middleware->validateCsrfTokens(except: [
            'api/contact',
            'api/newsletter-subscribe',
            'api/brochure-request',
        ]);
        $middleware->alias([
            'admin.session' => \App\Http\Middleware\EnsureAdminSessionAuthenticated::class,
            'public.form' => \App\Http\Middleware\ProtectPublicFormSubmission::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (QueryException $exception, Request $request): ?Response {
            if (! $request->is('contact', 'contact-us', 'contact-form', 'whitepaper-form', 'api/contact', 'api/newsletter-subscribe', 'api/brochure-request')) {
                return null;
            }

            report($exception);

            $message = 'We could not save your request right now. Please try again in a few minutes.';

            $connectionUnavailable = (int) $exception->getCode() === 2002
                || str_contains(Str::lower($exception->getMessage()), 'actively refused it')
                || str_contains(Str::lower($exception->getMessage()), 'connection refused');

            if ($connectionUnavailable) {
                $message = 'The contact service is temporarily unavailable because the database connection is down. Please try again in a few minutes.';
            }

            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => $message,
                ], 503);
            }

            return redirect()
                ->back()
                ->withInput($request->except(['captcha_token', 'company_url', 'website', 'botcheck', 'form_signature']))
                ->withErrors(['form' => $message]);
        });
    })->create();
