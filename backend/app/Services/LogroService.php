<?php

namespace App\Services;

use App\Models\Logro;

class LogroService
{
    public function store(array $data): Logro
    {
        $logro = Logro::create([
            'nombre' => $data['nombre'],
            'descripcion' => $data['descripcion'] ?? null,
            'url' => $data['url'] ?? null,
        ]);

        if (isset($data['users'])) {

            $syncData = [];

            foreach ($data['users'] as $userId) {
                $syncData[$userId] = [
                    'fecha_obtenido' => now()
                ];
            }

            $logro->users()->sync($syncData);
        }

        return $logro->load('users');
    }

    public function update(Logro $logro, array $data): Logro
    {
        $logro->update([
            'nombre' => $data['nombre'] ?? $logro->nombre,
            'descripcion' => $data['descripcion'] ?? $logro->descripcion,
            'url' => $data['url'] ?? $logro->url,
        ]);

        if (isset($data['users'])) {

            $syncData = [];

            foreach ($data['users'] as $userId) {
                $syncData[$userId] = [
                    'fecha_obtenido' => now()
                ];
            }

            $logro->users()->sync($syncData);
        }

        return $logro->load('users');
    }
}