<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLogroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'url' => ['nullable', 'string', 'max:255'],

            'users' => ['nullable', 'array'],
            'users.*' => ['exists:users,id'],
        ];
    }
}