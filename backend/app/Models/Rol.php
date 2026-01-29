<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{

    protected $fillable = ['nombre'];

    public function permisos()
    {
        return $this->belongsToMany(
            Permiso::class,
            'roles_permiso',
            'id_rol',
            'id_permiso'
        );
    }
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'asignaciones');
    }
}
