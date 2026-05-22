<?php

namespace Database\Seeders;

use App\Models\Enemigo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolSeeder::class);
        $this->call(LogroSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(NaveSeeder::class);
        $this->call(PerfilSeeder::class);
        $this->call(EnemigoSeeder::class);
        $this->call(NivelSeeder::class);
        $this->call(RankingSeeder::class);
    }
}
