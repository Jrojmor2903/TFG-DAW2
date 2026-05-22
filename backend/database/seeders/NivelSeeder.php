<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nivel;
use App\Models\Enemigo;

class NivelSeeder extends Seeder
{
    public function run(): void
    {
        $niveles = [
            [
                'nombre_nivel' => 'Nivel 1 - Iniciación',
                'dificultad' => 1,
            ],
            [
                'nombre_nivel' => 'Nivel 2 - Base enemiga',
                'dificultad' => 2,
            ],
            [
                'nombre_nivel' => 'Nivel 3 - Ataque intensivo',
                'dificultad' => 3,
            ],
            [
                'nombre_nivel' => 'Nivel 4 - Jefe final',
                'dificultad' => 4,
            ],
        ];

        $enemigos = Enemigo::all();

        foreach ($niveles as $index => $nivelData) {
            
            $nivel = Nivel::updateOrCreate(
                ['nombre_nivel' => $nivelData['nombre_nivel']],
                ['dificultad' => $nivelData['dificultad']]
            );

            $syncData = [];
            foreach ($enemigos as $enemigo) {
                $syncData[$enemigo->id] = [
                    'cantidad' => ($index + 1) * 2
                ];
            }

            $nivel->enemigos()->syncWithoutDetaching($syncData);
        }
    }
}