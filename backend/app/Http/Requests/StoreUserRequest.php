<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'   => 'required|string|max:255',
            'email'   => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'avatar_url'   => 'nullable|url|max:2048',
            'rol'      => 'required|array',
            'rol.*'    => 'exists:roles,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'   => 'El nombre es obligatorio.',
            'email.unique'     => 'El correo ya está registrado.',
            'password.confirmed'=> 'Las contraseñas no coinciden.',
            'rol.required'      => 'Debes seleccionar al menos un rol.',
        ];
    }
}