<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Logro;

class LogroSeeder extends Seeder
{
    public function run(): void
    {
        $logros = [
            [
                'nombre' => 'Nivel 1 completado',
                'descripcion' => 'Has superado el primer nivel del juego',
                'url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/logro-1.webp",
            ],
            [
                'nombre' => 'Nivel 2 completado',
                'descripcion' => 'Has superado el segundo nivel del juego',
                'url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/logro-2.webp",
            ],
            [
                'nombre' => 'Nivel 3 completado',
                'descripcion' => 'Has superado el tercer nivel del juego',
                'url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/logro-3.webp",
            ],
            [
                'nombre' => 'Nivel 4 completado',
                'descripcion' => 'Has superado el cuarto nivel del juego',
                'url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/logro-4.webp",
            ],
            [
                'nombre' => 'Ejemplo',
                'descripcion' => 'Ejemplo',
                'url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/logro-4.webp",
            ]
            
        ];

        foreach ($logros as $logro) {
            Logro::create($logro);
        }
    }
}