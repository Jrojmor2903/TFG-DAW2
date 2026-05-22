<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logro extends Model
{
    public $timestamps = false; 
    protected $fillable = [
        "id",
        "nombre",
        "descripcion",
        "url"
    ];

public function usuarios()
{
    return $this->belongsToMany(User::class, 'progresos', 'id_logro', 'id_usuario');
}
}
