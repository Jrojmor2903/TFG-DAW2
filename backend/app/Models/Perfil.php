<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_perfil';

    protected $fillable = [
        'id_usuario',
        'id_nave',
        'idioma',
        'tema_visual',
        'sonido',
        'dificultad'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "id_usuario");
    }
    public function nave()
    {
        return $this->belongsTo(Nave::class, "id_nave");
    }
}
