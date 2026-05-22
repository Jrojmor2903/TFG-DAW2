<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePerfilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_usuario'  => ['sometimes', 'integer', 'exists:usuarios,id'],
            'id_nave'     => ['sometimes', 'integer', 'exists:naves,id'],
            'idioma'      => ['sometimes', 'string', 'max:255'],
            'tema_visual' => ['sometimes', 'string', 'max:255'],
            'sonido'      => ['sometimes', 'boolean'],
            'dificultad'  => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'id_usuario.exists' => 'El usuario no existe.',
            'id_nave.exists'    => 'La nave no existe.',
        ];
    }
}