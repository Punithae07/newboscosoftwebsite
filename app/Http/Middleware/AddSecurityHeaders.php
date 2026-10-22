<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        $response->headers->set(
            'Content-Security-Policy',
            "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; ".
            "img-src 'self' data: https:; media-src 'self'; object-src 'none'; ".
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com; ".
            "style-src 'self' 'unsafe-inline'; font-src 'self' data:; ".
            "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://www.clarity.ms https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com; ".
            "frame-src 'self' https://www.google.com https://challenges.cloudflare.com;"
        );

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        return $response;
    }
}
