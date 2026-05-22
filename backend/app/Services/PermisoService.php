<?php

namespace App\Services;

use App\Models\Permiso;

use Illuminate\Support\Facades\DB;
use Exception;

class PermisoService
{
    public function createDefault($request)
    {

        DB::beginTransaction();

        try 
        {
            $permiso = Permiso::create([
                'nombre' => $request->nombre,
            ]);

            $permiso->roles()->sync($request->rol);

            DB::commit();

            return $permiso;
        } 
        catch (Exception $e) 
        {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la creación del permiso: '. $e->getMessage());
        }
    }

        public function updateDefault($request, $permiso)
    {
        $datos = [
            'nombre'       => $request->nombre,
        ];

        $permiso->update($datos);

        $permiso->roles()->sync($request->rol);
        
        return $permiso;
    }
}
