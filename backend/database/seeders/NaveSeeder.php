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
                'nombre' => 'Caza Ligero',
                'vida' => 100,
                'poder_disparo' => 20,
                'velocidad' => 80,
                'precio' => 0,
            ],
            [
                'nombre' => 'Interceptor',
                'vida' => 150,
                'poder_disparo' => 35,
                'velocidad' => 70,
                'precio' => 500,
            ],
            [
                'nombre' => 'Destructor',
                'vida' => 300,
                'poder_disparo' => 60,
                'velocidad' => 40,
                'precio' => 1200,
            ],
        ];

        foreach ($naves as $nave) {
            Nave::create($nave);
        }
    }
}