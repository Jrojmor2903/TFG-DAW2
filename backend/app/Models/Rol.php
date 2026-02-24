<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';
    protected $fillable = ['nombre', 'slug'];

    public function permisos()
    {
        return $this->belongsToMany(
            Permiso::class,
            'autorizaciones',
            'id_rol',
            'id_permiso'
        );
    }
    public function usuario()
    {
        return $this->belongsToMany(User::class, 'asignaciones', 'id_rol', 'id_user');
    }
}
