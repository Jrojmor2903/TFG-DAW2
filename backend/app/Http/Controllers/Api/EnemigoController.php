<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Enemigo\StoreEnemigoRequest;
use App\Http\Requests\Enemigo\UpdateEnemigoRequest;
use App\Models\Enemigo;
use App\Services\EnemigoService;

class EnemigoController extends Controller
{
    public function __construct(
        protected EnemigoService $enemigoService
    ) {}

    public function index()
    {
        return response()->json(
            Enemigo::with(['creado', 'nivel'])->get()
        );
    }

    public function show(Enemigo $enemigo)
    {
        return response()->json(
            $enemigo->load(['creado', 'nivel'])
        );
    }

    public function store(StoreEnemigoRequest $request)
    {
        $enemigo = $this->enemigoService->store(
            $request->validated()
        );

        return response()->json($enemigo, 201);
    }

    public function update(UpdateEnemigoRequest $request, Enemigo $enemigo)
    {
        $enemigo = $this->enemigoService->update(
            $enemigo,
            $request->validated()
        );

        return response()->json($enemigo);
    }

    public function destroy(Enemigo $enemigo)
    {
        $this->enemigoService->delete($enemigo);

        return response()->json([
            'message' => 'Enemigo eliminado correctamente'
        ]);
    }
}