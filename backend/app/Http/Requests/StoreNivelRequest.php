<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNivelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre_nivel' => ['required', 'string', 'max:255'],
            'dificultad' => ['required', 'integer', 'min:1'],
            'fondo_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}