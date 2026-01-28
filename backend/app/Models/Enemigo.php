<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enemigo extends Model
{
        protected $fillable = [
        "id_enemigo",
        "nombre",
        "vida",
        "daño",
        "puntos",
        "imagen_url",
        "creado_por"
    ];
}
