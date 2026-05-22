<?php

namespace App\Services;

use App\Models\Enemigo;

class EnemigoService
{
    public function store(array $data): Enemigo
    {
        return Enemigo::create([
            'nombre' => $data['nombre'],
            'vida' => $data['vida'],
            'daño' => $data['daño'],
            'puntos' => $data['puntos'],
            'imagen_url' => $data['imagen_url'] ?? null,
            'creado_por' => $data['creado_por'],
        ]);
    }

    public function update(Enemigo $enemigo, array $data): Enemigo
    {
        $enemigo->update([
            'nombre' => $data['nombre'] ?? $enemigo->nombre,
            'vida' => $data['vida'] ?? $enemigo->vida,
            'daño' => $data['daño'] ?? $enemigo->daño,
            'puntos' => $data['puntos'] ?? $enemigo->puntos,
            'imagen_url' => $data['imagen_url'] ?? $enemigo->imagen_url,
            'creado_por' => $data['creado_por'] ?? $enemigo->creado_por,
        ]);

        return $enemigo;
    }

    public function delete(Enemigo $enemigo): void
    {
        $enemigo->delete();
    }
}