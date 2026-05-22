<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNivelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre_nivel' => ['sometimes', 'string', 'max:255'],
            'dificultad' => ['sometimes', 'integer', 'min:1'],
            'fondo_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}