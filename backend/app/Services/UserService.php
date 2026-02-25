<?php

namespace App\Services;

use App\Services\ImagenService;

use App\Models\User;

use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Storage;

class UserService
{

    protected $imagenService;

    public function __construct(

        ImagenService $imagenService,

    ) {
        $this->imagenService = $imagenService;
    }

    public function createDefault($request)
    {

        DB::beginTransaction();

        try {

            $avatarUrl = null;
            if ($request->hasFile('avatar')) {
                $avatarUrl = $this->imagenService->subir($request->file('avatar'), $request->nombreImg ?? '');
            }

            $usuario = User::create([
                'name'       => $request->name,
                'email'      => $request->email,
                'password'   => $request->password,
                'avatar_url' => $avatarUrl,
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
        DB::beginTransaction();

        try {
            $avatarUrl = $user->avatar_url;


            if ($request->hasFile('avatar')) {

                if ($avatarUrl) {
                    $path = 'uploads/' . basename($avatarUrl);
                    Storage::disk('s3')->delete($path);
                }
                $avatarUrl = $this->imagenService->subir($request->file('avatar'), $request->nombreImg ?? '');
            }
            $datos = [
                'name'       => $request->name,
                'email'      => $request->email,
                'avatar_url' => $avatarUrl,
            ];

            if ($request->filled('password')) {
                $datos['password'] = $request->password;
            }

            $user->update($datos);

            $user->roles()->sync($request->rol);
            DB::commit();
            return $user;
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la actualización del usuario: ' . $e->getMessage());
        }
    }
}
