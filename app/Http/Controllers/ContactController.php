<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrochureStoreRequest;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\NewsletterSubscribeRequest;
use App\Services\AdminFormNotificationService;
use App\Services\BrochureRequestRepository;
use App\Services\ContactRepository;
use App\Services\NewsletterRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ContactController
{
    public function __construct(
        private readonly ContactRepository $contacts,
        private readonly NewsletterRepository $newsletters,
        private readonly BrochureRequestRepository $brochures,
        private readonly AdminFormNotificationService $notifications,
    ) {
    }

    public function store(ContactStoreRequest $request)
    {
        $validated = $request->validated();

        $redirectTo = match ($validated['source_page'] ?? '') {
            '/contact-form' => '/contact-form',
            '/contact-us' => '/contact-us',
            default => '/contact',
        };

        $validated['name'] = Str::squish($validated['name']);
        $validated['email'] = Str::lower(trim($validated['email']));
        $validated['phone'] = Str::squish($validated['phone']);
        $validated['message'] = trim($validated['message']);
        $validated['company'] = isset($validated['company']) ? Str::squish($validated['company']) : null;
        $validated['country'] = isset($validated['country']) ? Str::squish($validated['country']) : null;
        $validated['industry'] = isset($validated['industry']) ? Str::squish($validated['industry']) : null;
        $validated['product_interest'] = isset($validated['product_interest']) ? Str::squish($validated['product_interest']) : null;

        if ($this->contacts->hasRecentDuplicate(
            $validated['email'],
            $validated['message'],
            $validated['source_page'] ?? null,
        )) {
            return $this->duplicateResponse(
                $request,
                $redirectTo,
                'We already received a similar message recently. Please wait a few minutes before trying again.'
            );
        }

        $record = $this->contacts->createPublic(
            $validated,
            (string) $request->ip(),
            $request->userAgent()
        );

        $this->dispatchAdminNotification(static function () use ($validated): void {
            app(AdminFormNotificationService::class)->sendContactSubmission($validated);
        });

        
        
        
        logger()->info('Contact form submission saved.', [
            'id' => $record['id'],
            'email' => $record['email'],
            'mail_scheduled' => true,
            'stored_via' => 'database',
        ]);

        if (! $request->expectsJson()) {
            return redirect($redirectTo . '?submitted=1')->with(
                'contact_success',
                'Thank you. Your message has been received. Our team will contact you shortly.'
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Contact request saved successfully.',
            'id' => $record['id'],
            'mail_sent' => true,
            'admin_mail_sent' => true,
            'mail_scheduled' => true,
            'stored' => true,
        ]);
    }

    public function subscribe(NewsletterSubscribeRequest $request)
    {
        $validated = $request->validated();
        $email = Str::lower(trim($validated['email']));

        if ($this->newsletters->hasSubscription($email)) {
            return response()->json([
                'success' => false,
                'message' => 'This email address is already subscribed to the newsletter.',
            ], 409);
        }

        $record = $this->newsletters->create($email, (string) $request->ip(), $request->userAgent());

        $this->dispatchAdminNotification(static function () use ($email): void {
            app(AdminFormNotificationService::class)->sendNewsletterSubscription($email);
        });

        logger()->info('Newsletter subscription saved.', [
            'id' => $record->id,
            'email' => $record->email,
            'mail_scheduled' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thanks for subscribing. We will keep you posted with new updates.',
            'id' => $record->id,
            'mail_sent' => true,
            'admin_mail_sent' => true,
            'mail_scheduled' => true,
            'web3forms_sent' => false,
        ]);
    }

    public function brochure(BrochureStoreRequest $request)
    {
        $validated = $request->validated();

        $validated['name'] = Str::squish($validated['name']);
        $validated['email'] = Str::lower(trim($validated['email']));
        $validated['phone'] = Str::squish($validated['phone']);
        $validated['company'] = Str::squish($validated['company']);
        $validated['product_interest'] = Str::squish($validated['product_interest']);
        $validated['message'] = trim($validated['message']);

        if ($this->brochures->hasRecentDuplicate($validated['email'], $validated['product_interest'])) {
            return response()->json([
                'success' => false,
                'message' => 'We already received a similar brochure request recently. Please wait a few minutes before trying again.',
            ], 429);
        }

        $record = $this->brochures->create($validated, (string) $request->ip(), $request->userAgent());

        $this->dispatchAdminNotification(static function () use ($validated): void {
            app(AdminFormNotificationService::class)->sendBrochureRequest($validated);
        });

        logger()->info('Brochure request saved.', [
            'id' => $record->id,
            'email' => $record->organization_email,
            'mail_scheduled' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Brochure request saved successfully.',
            'id' => $record->id,
            'mail_sent' => true,
            'admin_mail_sent' => true,
            'mail_scheduled' => true,
            'web3forms_sent' => false,
        ]);
    }

    private function duplicateResponse(Request $request, string $redirectTo, string $message)
    {
        if (! $request->expectsJson()) {
            return redirect($redirectTo . '?error=1')
                ->withInput($request->except(['captcha_token', 'company_url', 'website', 'botcheck', 'form_signature']))
                ->withErrors(['form' => $message]);
        }

        return response()->json([
            'success' => false,
            'message' => $message,
        ], 429);
    }

    private function dispatchAdminNotification(callable $callback): void
    {
        dispatch(static function () use ($callback): void {
            $callback();
        })->afterResponse();
    }
}
