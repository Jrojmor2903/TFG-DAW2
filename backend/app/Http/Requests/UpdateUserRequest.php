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
            'name'   => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user->id),
            ],
            'password' => 'nullable|string|min:6|confirmed',
            'avatar_url'   => 'nullable|url|max:2048',
            'rol'      => 'required|array',
            'rol.*'    => 'exists:roles,id',
        ];
    }
}
