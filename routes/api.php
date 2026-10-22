<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminContactController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FormSecurityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::get('/form-security/challenge/{form}', [FormSecurityController::class, 'challenge'])
        ->whereIn('form', ['contact', 'newsletter', 'brochure']);

    Route::get('/contact', function (Request $request) {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Use POST to submit the contact form.',
            ], 405);
        }

        return redirect('/contact-us');
    });

    Route::get('/newsletter-subscribe', function (Request $request) {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Use POST to submit the newsletter form.',
            ], 405);
        }

        return redirect('/');
    });

    Route::get('/brochure-request', function (Request $request) {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Use POST to submit the brochure request form.',
            ], 405);
        }

        return redirect('/resources/white-papers');
    });

    Route::post('/contact', [ContactController::class, 'store'])->middleware('public.form:contact');
    Route::post('/newsletter-subscribe', [ContactController::class, 'subscribe'])->middleware('public.form:newsletter');
    Route::post('/brochure-request', [ContactController::class, 'brochure'])->middleware('public.form:brochure');
});

Route::prefix('admin')->middleware('web')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login'])->middleware('throttle:admin-login');
    Route::post('/change-password', [AdminAuthController::class, 'changePassword'])->middleware('throttle:admin-login');

    Route::middleware(['admin.session', 'throttle:admin-api'])->group(function () {
        Route::get('/session', [AdminAuthController::class, 'session']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/dashboard', [AdminContactController::class, 'dashboard']);
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::get('/contacts', [AdminContactController::class, 'index']);
        Route::post('/contacts', [AdminContactController::class, 'store']);
        Route::get('/contacts/{id}', [AdminContactController::class, 'show']);
        Route::put('/contacts/{id}', [AdminContactController::class, 'update']);
        Route::delete('/contacts/{id}', [AdminContactController::class, 'destroy']);
        Route::get('/newsletters', [AdminContactController::class, 'newsletters']);
        Route::get('/newsletters/{id}', [AdminContactController::class, 'showNewsletter']);
        Route::delete('/newsletters/{id}', [AdminContactController::class, 'destroyNewsletter']);
        Route::get('/brochures', [AdminContactController::class, 'brochures']);
        Route::get('/brochures/{id}', [AdminContactController::class, 'showBrochure']);
        Route::delete('/brochures/{id}', [AdminContactController::class, 'destroyBrochure']);
    });
});

