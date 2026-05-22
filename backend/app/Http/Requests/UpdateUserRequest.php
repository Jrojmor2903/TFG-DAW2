<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user->id;

        return [
            'name'   => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user->id),
            ],
            'avatar'   => 'nullable|image|max:2048',
            'nombreImg' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
            'rol'      => 'required|array',
            'rol.*'    => 'exists:roles,id',
        ];
    }
}
