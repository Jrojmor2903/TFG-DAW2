<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNaveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'        => 'required|string|max:255',
            'vida'          => 'required|integer|min:0',
            'poder_disparo' => 'required|integer|min:0',
            'cadencia'      => 'required|integer|min:0',
            'precio'        => 'required|integer|min:0',
            'avatar'        => 'nullable|image|max:2048',
            'nombreImg' => 'nullable|string|max:255'

        ];
    }

}