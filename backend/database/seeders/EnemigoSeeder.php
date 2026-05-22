<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enemigo;

class EnemigoSeeder extends Seeder
{
    public function run(): void
    {
        $enemigos = [
            [
                'nombre' => 'Nave 1',
                'vida' => 10,
                'daño' => 1,
                'puntos' => 10,
                'imagen_url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/Enemigo-1.png",
                'creado_por' => 1,
            ],
            [
                'nombre' => 'Nave 2',
                'vida' => 8,
                'daño' => 2,
                'puntos' => 15,
                'imagen_url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/Enemigo-2.png",
                'creado_por' => 1,
            ],
            [
                'nombre' => 'Nave 3',
                'vida' => 20,
                'daño' => 3,
                'puntos' => 25,
                'imagen_url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/Enemigo-3.png",
                'creado_por' => 1,
            ],
            [
                'nombre' => 'Nave 4',
                'vida' => 50,
                'daño' => 5,
                'puntos' => 100,
                'imagen_url' => "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/enemigo-4.png",
                'creado_por' => 1,
            ],
        ];

        foreach ($enemigos as $enemigo) {
            Enemigo::updateOrCreate(
                ['nombre' => $enemigo['nombre']],
                [
                    'vida'       => $enemigo['vida'],
                    'daño'       => $enemigo['daño'],
                    'puntos'     => $enemigo['puntos'],
                    'imagen_url' => $enemigo['imagen_url'],
                    'creado_por' => $enemigo['creado_por'],
                ]
            );
        }
    }
}