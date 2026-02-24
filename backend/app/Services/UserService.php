<?php

namespace App\Services;

use App\Models\User;

use Illuminate\Support\Facades\DB;
use Exception;

class UserService
{
    public function createDefault($request)
    {

        DB::beginTransaction();

        try {
            $usuario = User::create([
                'name'       => $request->name,
                'email'      => $request->email,
                'password'   => $request->password,
                'avatar_url' => $request->avatar_url,
            ]);

            $usuario->roles()->sync($request->rol);

            DB::commit();

            return $usuario;
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la creación del usuario: ' . $e->getMessage());
        }
    }

    public function updateDefault($request, $user)
    {
        $datos = [
            'name'       => $request->name,
            'email'      => $request->email,
            'avatar_url' => $request->avatar_url,
        ];

        if ($request->filled('password')) {
            $datos['password'] = $request->password;
        }

        $user->update($datos);

        $user->roles()->sync($request->rol);

        return $user;
    }
}
