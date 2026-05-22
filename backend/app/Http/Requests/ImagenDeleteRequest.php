<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImagenDeleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'model' => 'required|string|in:User,Nivel,Nave',
            'id' => 'required|integer|min:1',
            'field' => 'required|string|in:avatar_url,fondo_url,imagen',
        ];
    }
}