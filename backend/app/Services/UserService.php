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
        // 1. Por defecto, mantenemos el avatar actual del usuario
        $avatarUrl = $user->avatar_url;

        // 2. CASO A: Si el Administrador pegó una URL de texto (viene como string en 'avatar_url')
        if ($request->filled('avatar_url')) {
            $avatarUrl = $request->avatar_url;
        }
        
        // 3. CASO B: Si se subió un archivo físico real (pesa más y sobrescribe el texto)
        if ($request->hasFile('avatar')) {
            if ($user->avatar_url) {
                $path = 'uploads/' . basename($user->avatar_url);
                Storage::disk('s3')->delete($path);
            }
            $avatarUrl = $this->imagenService->subir($request->file('avatar'), $request->nombreImg ?? '');
        }

        $datos = [
            'name'       => $request->name,
            'email'      => $request->email,
            'avatar_url' => $avatarUrl, // 🚀 Ahora sí llevará la nueva URL de texto si se editó
        ];

        if ($request->filled('password')) {
            $datos['password'] = $request->password; // Recuerda asegurarte si tu modelo tiene un Mutator para encriptarla, o ponle Hash::make() aquí si no lo tiene.
        }

        $user->update($datos);

        // Sincronizar roles
        $user->roles()->sync($request->rol);
        
        DB::commit();
        return $user;
    } catch (Exception $e) {
        DB::rollBack();
        throw new Exception('Ha ocurrido un error durante la actualización del usuario: ' . $e->getMessage());
    }
}
    public function deleteDefault($url)
    {
        if (!$url) {
            return;
        }

        $path = str_replace('https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/', '', $url);

        Storage::disk('s3')->delete($path);
    }
}
