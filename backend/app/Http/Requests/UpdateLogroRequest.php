<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLogroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['sometimes', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'url' => ['nullable', 'string', 'max:255'],

            'usuarios' => ['nullable', 'array'],
            'usuarios.*' => ['exists:users,id'],
        ];
    }
}