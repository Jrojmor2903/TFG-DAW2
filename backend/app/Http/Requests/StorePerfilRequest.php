<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePerfilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_usuario'  => ['required', 'integer', 'exists:usuarios,id'],
            'id_nave'     => ['required', 'integer', 'exists:naves,id'],
            'idioma'      => ['sometimes', 'string', 'max:255'],
            'tema_visual' => ['sometimes', 'string', 'max:255'],
            'sonido'      => ['sometimes', 'boolean'],
            'dificultad'  => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'id_usuario.required' => 'El usuario es obligatorio.',
            'id_usuario.exists'   => 'El usuario no existe.',
            'id_nave.required'    => 'La nave es obligatoria.',
            'id_nave.exists'      => 'La nave no existe.',
        ];
    }
}