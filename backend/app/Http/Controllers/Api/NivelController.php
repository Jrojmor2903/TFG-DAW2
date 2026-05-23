<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNivelRequest;
use App\Http\Requests\UpdateNivelRequest;
use App\Models\Nivel;
use App\Models\User;
use App\Services\NivelService;

class NivelController extends Controller
{
    public function __construct(
        protected NivelService $nivelService
    ) {}

public function index()
{
    $niveles = Nivel::with(['creador:id,name', 'enemigos'])->get();
    return response()->json($niveles);
}

public function total()
{
    return response()->json(['total' => Nivel::max('id')]);
}


public function creados()
{
    return response()->json(
        Nivel::where('tipo', 'creado')
            ->whereNotNull('id_creador')
            ->with(['enemigos', 'creador:id,name'])
            ->get()
    );
}

public function show($id)
{
    $nivel = Nivel::with('enemigos')->findOrFail($id);
    $totalNiveles = Nivel::count();
    
    $data = $nivel->toArray();
    $data['es_ultimo'] = $nivel->id === $totalNiveles; // o Nivel::max('id')
    
    return response()->json($data);
}
    public function store(StoreNivelRequest $request)
    {
        $nivel = $this->nivelService->store(
            $request->validated()
        );

        return response()->json($nivel, 201);
    }

    public function update(UpdateNivelRequest $request, Nivel $nivel)
    {
        $nivel = $this->nivelService->update(
            $nivel,
            $request->validated()
        );

        return response()->json($nivel);
    }

    public function destroy(Nivel $nivel)
    {
        $this->nivelService->delete($nivel);

        return response()->json([
            'message' => 'Nivel eliminado correctamente'
        ]);
    }
}