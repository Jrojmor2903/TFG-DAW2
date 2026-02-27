<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ImagenService
{
    public function subir(UploadedFile $archivo, string $nombreDeseado)
    {
        $extension = $archivo->getClientOriginalExtension();
        $carpeta = 'uploads';

        if (empty($nombreDeseado)) {
            $nombreBase = pathinfo($archivo->getClientOriginalName(), PATHINFO_FILENAME);
        } else {
            $nombreBase = Str::slug($nombreDeseado);
        }

        $nombreArchivo = $nombreBase . '.' . $extension;
        $rutaCompleta = $carpeta . '/' . $nombreArchivo;

        $contador = 1;

        while (Storage::disk('s3')->exists($rutaCompleta)) {
            $nombreArchivo = $nombreBase . $contador . '.' . $extension;
            $rutaCompleta = $carpeta . '/' . $nombreArchivo;
            $contador++;
        }

        Storage::disk('s3')->putFileAs($carpeta, $archivo, $nombreArchivo);

        return 'https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/' . $rutaCompleta;
    }

    public function updateUser($user)
    {

        $path = str_replace('https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/', '', $user->avatar_url);

        Storage::disk('s3')->delete($path);
    }

    public function deleteImageField($model, string $campo)
    {
        $url = $model->{$campo};
        if (!$url) return;

        $baseUrl = 'https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/';
        $path = str_replace($baseUrl, '', $url);

        if (Storage::disk('s3')->exists($path)) {
            Storage::disk('s3')->delete($path);
        }

        // Limpiar campo en la DB
        $model->{$campo} = null;
        $model->save();
    }
}
