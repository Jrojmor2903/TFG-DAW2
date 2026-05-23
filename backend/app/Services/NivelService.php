<?php

namespace App\Services;

use App\Models\Nivel;

class NivelService
{
public function store(array $data, int $idCreador): Nivel
{
    $nivel = Nivel::create([
        'nombre_nivel'     => $data['nombre_nivel'],
        'dificultad'       => $data['dificultad'],
        'fondo_url'        => $data['fondo_url'] ?? null,
        'velocidad'        => $data['velocidad'],
        'intervalo_oleada' => $data['intervalo_oleada'],
        'enemigos_oleada'  => $data['enemigos_oleada'],
        'tipo'             => 'creado',
        'id_creador'       => $idCreador,
    ]);

    // sync pivot escalados
    $sync = [];
    foreach ($data['enemigos'] as $e) {
        $sync[$e['id']] = ['cantidad' => $e['cantidad']];
    }
    $nivel->enemigos()->sync($sync);

    return $nivel;
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