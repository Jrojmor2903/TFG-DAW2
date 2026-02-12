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
        $admin = User::updateOrCreate(
            ['name' => 'Admin'],
            [
                'email' => 'admin@admin.com',
                'password' => 'password',
            ]
        );

        $user = User::updateOrCreate(
            ['name' => 'Usuario'],
            [
                'email' => 'user@user.com',
                'password' => 'password',
            ]
        );

        $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        $user->roles()->syncWithoutDetaching([$userRole->id]);
    }
}
