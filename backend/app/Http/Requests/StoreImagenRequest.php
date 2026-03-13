<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImagenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'imagen'   => 'required|image|max:2048',
            'nombreImg' => 'nullable|string|max:255',
        ];
    }
}
