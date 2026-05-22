<?php

namespace App\Http\Requests\Enemigo;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEnemigoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['sometimes', 'string', 'max:255'],
            'vida' => ['sometimes', 'integer', 'min:1'],
            'daño' => ['sometimes', 'integer', 'min:0'],
            'puntos' => ['sometimes', 'integer', 'min:0'],
            'imagen_url' => ['nullable', 'string', 'max:255'],
            'creado_por' => ['sometimes', 'exists:users,id'],
        ];
    }
}