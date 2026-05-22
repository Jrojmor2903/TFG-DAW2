<?php

namespace App\Services;

use App\Models\Nivel;

class NivelService
{
    public function store(array $data): Nivel
    {
        return Nivel::create([
            'nombre_nivel' => $data['nombre_nivel'],
            'dificultad' => $data['dificultad'],
            'fondo_url' => $data['fondo_url'] ?? null,
        ]);
    }

    public function update(Nivel $nivel, array $data): Nivel
    {
        $nivel->update([
            'nombre_nivel' => $data['nombre_nivel'] ?? $nivel->nombre_nivel,
            'dificultad' => $data['dificultad'] ?? $nivel->dificultad,
            'fondo_url' => $data['fondo_url'] ?? $nivel->fondo_url,
        ]);

        return $nivel;
    }

    public function delete(Nivel $nivel): void
    {
        $nivel->delete();
    }
}