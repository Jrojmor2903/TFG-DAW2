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
            'nombre_nivel'        => ['required', 'string', 'max:255'],
            'dificultad'          => ['required'],
            'fondo_url'           => ['nullable', 'string', 'max:255'],
            'id_creador'          => ['required', 'integer', 'exists:users,id'],
            'tipo'                => ['nullable', 'string', 'in:historia,creado'],
            'enemigos'            => ['required', 'array', 'min:1'],
            'enemigos.*.id'       => ['required', 'exists:enemigos,id'],
            'enemigos.*.cantidad' => ['required', 'integer', 'min:1'],
        ];
    }
}