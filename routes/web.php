<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/assets/{path}', function (string $path) {
    $assetPath = public_path('build/assets/'.$path);

    abort_unless(is_file($assetPath), 404);

    return response()->file($assetPath, [
        'Content-Type' => mime_content_type($assetPath) ?: 'application/octet-stream',
        'Cache-Control' => 'public, max-age=31536000, immutable',
    ]);
})->where('path', '.*');

Route::view('/', 'app');
Route::view('/contact-form', 'contact-form');
Route::view('/whitepaper-form', 'whitepaper-form');
Route::view('/admin/login', 'app');

Route::prefix('admin')->middleware('admin.session')->group(function () {
    Route::view('/', 'app');
    Route::view('/{path}', 'app')->where('path', '^(?!login$).*$');
});

Route::post('/contact', [ContactController::class, 'store'])->middleware('public.form:contact');
Route::post('/contact-us', [ContactController::class, 'store'])->middleware('public.form:contact');
Route::post('/contact-form', [ContactController::class, 'store'])->middleware('public.form:contact');
Route::post('/whitepaper-form', [ContactController::class, 'brochure'])->middleware('public.form:brochure');

Route::get('/sitemap.xml', function () {
    $configuredAppUrl = rtrim((string) config('app.url'), '/');
    $baseUrl = blank($configuredAppUrl) || str_contains($configuredAppUrl, 'example.com')
        ? request()->getSchemeAndHttpHost()
        : $configuredAppUrl;
    $paths = [
        '/',
        '/about',
        '/mission-vision',
        '/leadership',
        '/careers',
        '/contact-us',
        '/products',
        '/products/smartschoolnxt',
        '/products/higrade',
        '/products/medsysb',
        '/products/acme-erp',
        '/products/microfund',
        '/products/cristo-suite',
        '/products/eaudithub',
        '/services',
        '/services/ai-transformation',
        '/services/data-analytics-ai',
        '/services/erp-crm-implementation',
        '/services/integration-ecosystems',
        '/services/saas-engineering',
        '/services/cloud-infrastructure',
        '/resources',
        '/resources/blogs',
        '/resources/white-papers',
        '/resources/success-stories',
        '/privacy-policy',
        '/terms-of-use',
        '/refund-policy',
        '/security',
    ];

    return response()
        ->view('sitemap', [
            'baseUrl' => $baseUrl,
            'paths' => $paths,
            'lastModified' => now()->toDateString(),
        ])
        ->header('Content-Type', 'application/xml');
});

Route::view('/{path}', 'app')
    ->where('path', '^(?!api(?:/|$)|admin(?:/|$)|contact-form$|whitepaper-form$|sitemap\.xml$|storage(?:/|$)).*');
