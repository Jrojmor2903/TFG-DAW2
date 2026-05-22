<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermisoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'   => 'required|string|max:255',
            'rol'      => 'required|array',
            'rol.*'    => 'exists:roles,id',
        ];
    }

}