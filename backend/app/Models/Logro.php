<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logro extends Model
{
    protected $fillable = [
        "id",
        "nombre",
        "descripcion",
        "puntos",
        "url"
    ];

    public function usuario()
    {
        return $this->belongsToMany(User::class, 'progresos');
    }
}
