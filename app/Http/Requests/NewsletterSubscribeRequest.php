<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsletterSubscribeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email:rfc', 'max:190'],
            'company_url' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'botcheck' => ['nullable', 'string', 'max:255'],
            'form_issued_at' => ['required', 'integer', 'min:1'],
            'form_nonce' => ['required', 'string', 'max:255'],
            'form_signature' => ['required', 'string', 'max:255'],
            'captcha_token' => ['required', 'string', 'max:4096'],
        ];
    }
}
