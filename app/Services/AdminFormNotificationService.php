<?php

namespace App\Services;

use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AdminFormNotificationService
{
    public function sendContactSubmission(array $payload): bool
    {
        return $this->send(
            subject: 'New contact enquiry from Boscosoft website',
            lines: [
                'A new contact form submission was received.',
                '',
                'Name: '.($payload['name'] ?? ''),
                'Email: '.($payload['email'] ?? ''),
                'Phone: '.($payload['phone'] ?? ''),
                'Company: '.($payload['company'] ?? ''),
                'Country: '.($payload['country'] ?? ''),
                'Industry: '.($payload['industry'] ?? ''),
                'Interest: '.($payload['product_interest'] ?? ''),
                'Source Page: '.($payload['source_page'] ?? ''),
                '',
                'Message:',
                (string) ($payload['message'] ?? ''),
            ],
            replyTo: $payload['email'] ?? null,
        );
    }

    public function sendNewsletterSubscription(string $email): bool
    {
        return $this->send(
            subject: 'New newsletter subscription from Boscosoft website',
            lines: [
                'A new newsletter subscription was received.',
                '',
                'Email: '.$email,
                'Subscribed At: '.now()->toDateTimeString(),
            ],
            replyTo: $email,
        );
    }

    public function sendBrochureRequest(array $payload): bool
    {
        return $this->send(
            subject: 'New brochure request from Boscosoft website',
            lines: [
                'A new brochure or white paper request was received.',
                '',
                'Name: '.($payload['name'] ?? ''),
                'Email: '.($payload['email'] ?? ''),
                'Phone: '.($payload['phone'] ?? ''),
                'Organization: '.($payload['company'] ?? ''),
                'Requested Asset: '.($payload['product_interest'] ?? ''),
                'Source Page: '.($payload['source_page'] ?? ''),
                '',
                'Message:',
                (string) ($payload['message'] ?? ''),
            ],
            replyTo: $payload['email'] ?? null,
        );
    }

    private function send(string $subject, array $lines, ?string $replyTo = null): bool
    {
        $adminEmail = trim((string) config('admin.email', ''));
        $adminCcEmails = array_values(array_filter(array_map(
            static fn (string $email): string => trim($email),
            (array) config('admin.cc_emails', [])
        )));

        if ($adminEmail === '') {
            Log::warning('Admin form notification skipped because ADMIN_EMAIL is not configured.', [
                'subject' => $subject,
            ]);

            return false;
        }

        try {
            Mail::raw(implode(PHP_EOL, $lines), function (Message $message) use ($adminEmail, $adminCcEmails, $subject, $replyTo): void {
                $message->to($adminEmail)->subject($subject);

                if ($adminCcEmails !== []) {
                    $message->cc($adminCcEmails);
                }

                if ($replyTo) {
                    $message->replyTo($replyTo);
                }
            });

            return true;
        } catch (\Throwable $exception) {
            Log::error('Admin form notification failed.', [
                'subject' => $subject,
                'message' => $exception->getMessage(),
            ]);

            return false;
        }
    }
}
