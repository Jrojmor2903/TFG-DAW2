<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ImagenService
{
    public function subir(UploadedFile $archivo, string $nombreDeseado)
    {

        if (empty($nombreDeseado)) {
            $nombreDeseado = $archivo->getClientOriginalName();
        }

        $carpeta = 'uploads';

        $path = Storage::disk('s3')->putFileAs($carpeta, $archivo, $nombreDeseado);

        $url = 'https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/' . $path;
        return $url;
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

        $baseUrl = 'https://<PROJECT_REF>.supabase.co/storage/v1/object/public/<BUCKET>/';
        $path = str_replace($baseUrl, '', $url);

        if (Storage::disk('s3')->exists($path)) {
            Storage::disk('s3')->delete($path);
        }

        // Limpiar campo en la DB
        $model->{$campo} = null;
        $model->save();
    }

}
