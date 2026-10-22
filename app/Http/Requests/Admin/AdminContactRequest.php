<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:190'],
            'phone' => ['nullable', 'string', 'max:60', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'company' => ['nullable', 'string', 'max:190'],
            'country' => ['nullable', 'string', 'max:120'],
            'industry' => ['nullable', 'string', 'max:120'],
            'product_interest' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'max:5000'],
            'source_page' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['New', 'Contacted', 'In Progress', 'Converted', 'Closed'])],
        ];
    }
}
