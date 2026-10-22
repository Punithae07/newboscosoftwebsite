<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_origins' => array_values(array_filter([
        env('APP_URL'),
    ])),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'X-CSRF-TOKEN', 'X-Requested-With', 'Accept'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
