<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_rol';
    protected $fillable = ['nombre'];

    // N:N con Permisos
    public function permisos()
    {
        return $this->belongsToMany(Permiso::class, 'roles_permisos', 'id_rol', 'id_permiso')
            ->withTimestamps();
    }

    // N:N con Usuarios
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'id_rol', 'user_id')
            ->withTimestamps();
    }
}
