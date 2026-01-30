<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Rol::where('slug', 'admin')->first();
        $userRole  = Rol::where('slug', 'user')->first();

        // Crear usuarios
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
        ]);

        $user = User::create([
            'name' => 'Usuario',
            'email' => 'user@user.com',
            'password' => Hash::make('password'),
        ]);

        $admin->roles()->attach($adminRole->id);
        $user->roles()->attach($userRole->id);
    }
}