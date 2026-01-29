<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    protected $fillable = [
        "id",
        "id_usuario",
        "puntuacion",
        "duracion",
        "fecha_partida"
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "id_usuario");
    }
}
