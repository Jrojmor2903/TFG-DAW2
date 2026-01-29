<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $fillable = ['nombre'];

    public function roles()
    {
        return $this->belongsToMany(
            Rol::class,
            'roles_permiso',
            'id_permiso',
            'id_rol'
        );
    }
}
