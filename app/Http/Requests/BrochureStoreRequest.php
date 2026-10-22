<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrochureStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'phone' => ['required', 'string', 'max:60', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'company' => ['required', 'string', 'max:190'],
            'product_interest' => ['required', 'string', 'max:160'],
            'message' => ['required', 'string', 'max:5000'],
            'source_page' => ['nullable', 'string', 'max:255'],
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
