<?php

namespace App\Http\Requests\Enemigo;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnemigoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'vida' => ['required', 'integer', 'min:1'],
            'daño' => ['required', 'integer', 'min:0'],
            'puntos' => ['required', 'integer', 'min:0'],
            'imagen_url' => ['nullable', 'string', 'max:255'],
            'creado_por' => ['required', 'exists:users,id'],
        ];
    }
}