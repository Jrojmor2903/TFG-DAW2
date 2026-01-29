<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enemigo extends Model
{
    protected $fillable = [
        "id",
        "nombre",
        "vida",
        "daño",
        "puntos",
        "imagen_url",
        "creado_por"
    ];
    public function creado()
    {
        return $this->belongsTo(User::class, 'creado_por');
    }
    public function nivel()
    {
        return $this->belongsToMany(
            Nivel::class,
            'escalados',
            'id_enemigo',
            'id_nivel'
        )->withPivot('cantidad');
    }

}
