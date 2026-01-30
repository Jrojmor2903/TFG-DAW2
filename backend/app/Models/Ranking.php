<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ranking extends Model
{
    protected $table = 'rankings';

    protected $fillable = [
        "id_usuario",
        "puntuacion",
        "fecha_partida"
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
