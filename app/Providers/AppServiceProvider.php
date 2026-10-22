<?php

namespace App\Providers;

use RuntimeException;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        if (app()->environment('production') && ! config('app.key')) {
            throw new RuntimeException('APP_KEY must be configured in production.');
        }

        RateLimiter::for('admin-login', function (Request $request) {
            return Limit::perMinute(5)->by(
                $request->ip().'|'.strtolower((string) $request->input('email'))
            );
        });

        RateLimiter::for('admin-api', function (Request $request) {
            return Limit::perMinute(120)->by(
                (string) $request->session()->getId()
            );
        });
    }
}
