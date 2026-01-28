<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $fillable = [
        "id",
        "nombre_nivel",
        "dificultad",
        "num_enemigos",
        "fondo_url"
    ];
}
