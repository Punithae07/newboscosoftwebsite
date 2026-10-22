<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\AdminChangePasswordRequest;
use App\Http\Requests\Admin\AdminLoginRequest;
use App\Models\AdminUser;
use App\Services\AdminUserRepository;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminAuthController
{
    public function __construct(private readonly AdminUserRepository $adminUsers)
    {
    }

    public function login(AdminLoginRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $incomingEmail = Str::lower(trim($validated['email']));
        $incomingPassword = $validated['password'];

        try {
            $adminUser = $this->adminUsers->findActiveByEmail($incomingEmail);
        } catch (QueryException $exception) {
            report($exception);

            return response()->json([
                'message' => 'Admin login is temporarily unavailable. Please try again shortly.',
            ], 503);
        }

        if (! $adminUser instanceof AdminUser) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 422);
        }

        if (! Hash::check($incomingPassword, (string) $adminUser->password)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 422);
        }

        $adminUser->forceFill([
            'last_login_at' => now(),
        ])->save();

        return $this->createAuthenticatedSession($request, $adminUser->id, (string) $adminUser->email, (string) $adminUser->name);
    }

    public function changePassword(AdminChangePasswordRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $email = Str::lower(trim($validated['email']));

        try {
            $adminUser = $this->adminUsers->findActiveByEmail($email);
        } catch (QueryException $exception) {
            report($exception);

            return response()->json([
                'message' => 'Admin account service is temporarily unavailable. Please try again shortly.',
            ], 503);
        }

        if (! $adminUser instanceof AdminUser) {
            return response()->json([
                'message' => 'This admin account was not found in the database.',
            ], 404);
        }

        if (! Hash::check($validated['current_password'], (string) $adminUser->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.',
            ], 422);
        }

        if (Hash::check($validated['new_password'], (string) $adminUser->password)) {
            return response()->json([
                'message' => 'Choose a different password from your current one.',
            ], 422);
        }

        $adminUser->forceFill([
            'password' => Hash::make($validated['new_password']),
        ])->save();

        return response()->json([
            'message' => 'Password changed successfully. Please sign in with your new password.',
        ]);
    }

    public function session(Request $request): JsonResponse
    {
        return response()->json([
            'session' => [
                'id' => $request->session()->get('admin_user_id'),
                'name' => (string) $request->session()->get('admin_name', ''),
                'email' => (string) $request->session()->get('admin_email'),
                'expires_in_minutes' => (int) config('admin.session_lifetime', 120),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    private function createAuthenticatedSession(Request $request, ?int $adminUserId, string $email, string $name): JsonResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerate();
        $request->session()->put([
            'admin_authenticated' => true,
            'admin_user_id' => $adminUserId,
            'admin_name' => $name,
            'admin_email' => $email,
            'admin_last_activity' => time(),
        ]);

        return response()->json([
            'session' => [
                'id' => $adminUserId,
                'name' => $name,
                'email' => $email,
                'expires_in_minutes' => (int) config('admin.session_lifetime', 120),
            ],
        ]);
    }
}
