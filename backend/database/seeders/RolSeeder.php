<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    public function run(): void
    {
        Rol::insert([
            [
                'nombre' => 'Administrador',
                'slug' => 'admin',
            ],
            [
                'nombre' => 'Usuario',
                'slug' => 'user',
            ],
        ]);
    }
}
