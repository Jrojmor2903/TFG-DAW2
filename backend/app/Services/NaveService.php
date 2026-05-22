<?php

namespace App\Services;

use App\Services\ImagenService;

use App\Models\Nave;

use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Storage;

class NaveService
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

            $nave = Nave::create([
                'nombre'       => $request->nombre,
                'vida'      => $request->vida,
                'poder_disparo'   => $request->poder_disparo,
                'cadencia'   => $request->cadencia,
                'precio'   => $request->precio,
                'avatar_url' => $avatarUrl ?? '',
            ]);

            DB::commit();

            return $nave;
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la creación de la nave: ' . $e->getMessage());
        }
    }

    public function updateDefault($request, $nave)
    {
        DB::beginTransaction();

        try {
            $avatarUrl = $nave->avatar_url;


            if ($request->hasFile('avatar')) {

                if ($avatarUrl) {
                    $path = 'uploads/' . basename($avatarUrl);
                    Storage::disk('s3')->delete($path);
                }
                $avatarUrl = $this->imagenService->subir($request->file('avatar'), $request->nombreImg ?? '');
            }
            $datos = [
                'nombre'        => $request->nombre,
                'vida'          => $request->vida,
                'poder_disparo' => $request->poder_disparo,
                'cadencia'      => $request->cadencia,
                'precio'        => $request->precio,
                'avatar_url' => $avatarUrl,
            ];

            $nave->update($datos);

            DB::commit();
            return $nave;
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception('Ha ocurrido un error durante la actualización de la nave: ' . $e->getMessage());
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
