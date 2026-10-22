<?php

return [
    'email' => env('ADMIN_EMAIL', ''),
    'cc_emails' => array_values(array_filter(array_map(
        static fn (string $email): string => trim($email),
        explode(',', (string) env('ADMIN_CC_EMAIL', ''))
    ))),
];
