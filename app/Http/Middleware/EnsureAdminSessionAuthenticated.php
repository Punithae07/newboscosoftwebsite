<?php

namespace App\Http\Middleware;

use App\Services\AdminUserRepository;
use Closure;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminSessionAuthenticated
{
    public function __construct(private readonly AdminUserRepository $adminUsers)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->get('admin_authenticated')) {
            return $this->unauthorized($request);
        }

        $adminUserId = $request->session()->get('admin_user_id');

        if ($adminUserId !== null) {
            try {
                $adminUser = $this->adminUsers->findActiveById((int) $adminUserId);
            } catch (QueryException $exception) {
                report($exception);

                return response()->json([
                    'message' => 'Admin session validation is temporarily unavailable. Please try again shortly.',
                ], 503);
            }

            if (! $adminUser) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return $this->unauthorized($request, 'Your account is no longer available. Please sign in again.');
            }
        }

        $lastActivity = (int) $request->session()->get('admin_last_activity', 0);
        $lifetimeSeconds = max(60, (int) config('admin.session_lifetime', 120) * 60);

        if ($lastActivity > 0 && (time() - $lastActivity) > $lifetimeSeconds) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return $this->unauthorized($request, 'Your session has expired. Please sign in again.');
        }

        $request->session()->put('admin_last_activity', time());

        $response = $next($request);
        $response->headers->set('Cache-Control', 'no-store, private');

        return $response;
    }

    private function unauthorized(Request $request, string $message = 'Authentication required.'): Response
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => $message,
            ], 401);
        }

        return redirect('/admin/login');
    }
}
