<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user'); 

        return [
            'nombre'   => 'required|string|max:255',
            'correo'   => 'required|email|max:255|unique:users,email,' . $userId,
            'password' => 'nullable|string|min:6|confirmed',
            'avatar'   => 'nullable|url|max:2048',
            'rol'      => 'required|array',
            'rol.*'    => 'exists:roles,id',
        ];
    }
}
