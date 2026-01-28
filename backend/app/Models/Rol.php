<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{

    protected $primaryKey = 'id_rol';
    protected $fillable = ['nombre'];

    public function permisos()
    {
        return $this->belongsToMany(Permiso::class, 'roles_permisos', 'id_rol', 'id_permiso');
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'id_rol', 'user_id');
    }
    
}
