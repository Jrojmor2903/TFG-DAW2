<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class PerfilSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::whereIn('id', [1, 2])->get();

        foreach ($users as $user) {

            $user->perfil()->updateOrCreate(
                [
                    'id_usuario' => $user->id
                ],
                [
                    'id_nave' => 1,
                    'idioma' => 'es',
                    'tema_visual' => '#4affb7',
                ]
            );
        }
    }
}