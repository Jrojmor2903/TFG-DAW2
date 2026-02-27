<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RankingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_usuario' => [
                'required',
                'integer',
                'exists:users,id'
            ],

            'puntuacion' => [
                'required',
                'integer',
                'min:0'
            ],

            'fecha_partida' => [
                'nullable',
                'date'
            ],
        ];
    }
}