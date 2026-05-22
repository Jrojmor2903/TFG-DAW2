<?php

namespace App\Services;

use App\Models\Rol;

use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Str;


class RolService
{
    public function createDefault($request)
    {

        DB::beginTransaction();

        try {
            $rol = Rol::create([
                'nombre' => $request->nombre,
                'slug' => Str::slug($request->nombre)
            ]);

            $rol->permisos()->sync($request->permiso);

            DB::commit();

            return $rol;
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la creación del rol: ' . $e->getMessage());
        }
    }

    public function updateDefault($request, $rol)
    {
        $datos = [
            'nombre'       => $request->nombre,
            'slug'   => Str::slug($request->nombre)
        ];

        $rol->update($datos);

        $rol->permisos()->sync($request->permiso);

        return $rol;
    }
}
