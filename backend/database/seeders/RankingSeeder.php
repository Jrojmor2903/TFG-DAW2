<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RankingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('rankings')->insert([
            [
                'id_usuario' => 1,
                'puntuacion' => 1500,
                'fecha_partida' => Carbon::now(),
            ],
            [
                'id_usuario' => 2,
                'puntuacion' => 1200,
                'fecha_partida' => Carbon::now(),
            ],            [
                'id_usuario' => 1,
                'puntuacion' => 1500,
                'fecha_partida' => Carbon::now(),
            ],
            [
                'id_usuario' => 2,
                'puntuacion' => 1200,
                'fecha_partida' => Carbon::now(),
            ],            [
                'id_usuario' => 1,
                'puntuacion' => 1500,
                'fecha_partida' => Carbon::now(),
            ],
            [
                'id_usuario' => 2,
                'puntuacion' => 1200,
                'fecha_partida' => Carbon::now(),
            ],
        ]);
    }
}