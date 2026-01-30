<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $table = 'niveles';
    protected $fillable = [
        "nombre_nivel",
        "dificultad",
        "fondo_url"
    ];


    public function enemigos()
    {
        return $this->belongsToMany(
            Enemigo::class,
            'escalados',
            'id_nivel',
            'id_enemigo'
        )->withPivot('cantidad');
    }
}
