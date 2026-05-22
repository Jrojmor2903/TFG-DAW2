<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nave;

class NaveSeeder extends Seeder
{
    public function run(): void
    {

    $naves = [
        [
            'nombre' => 'F-16',
            'vida' => 3, 'poder_disparo' => 1, 'cadencia' => 2, 'precio' => 0,
            'avatar_url' => 'https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/f-16.png'
        ],
        [
            'nombre' => 'UAF',
            'vida' => 3, 'poder_disparo' => 1, 'cadencia' => 2, 'precio' => 0,
            'avatar_url' => 'https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/nave-2.png'
        ]
    ];

    foreach ($naves as $nave) {
        Nave::updateOrCreate(
            ['nombre' => $nave['nombre']],
            array_diff_key($nave, ['nombre' => ''])
        );
    }

    }
}