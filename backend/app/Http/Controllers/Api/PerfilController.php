<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Perfil;
use App\Http\Requests\StorePerfilRequest;
use App\Http\Requests\UpdatePerfilRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class PerfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $perfiles = Perfil::with(['usuario', 'nave'])->get();

        return response()->json($perfiles);
    }


public function getByUserId(Request $request): JsonResponse
{
    $request->validate([
        'userId' => ['required', 'integer', 'exists:users,id'],
    ]);

    $perfil = Perfil::with(['nave'])
        ->where('id_usuario', $request->userId)
        ->firstOrFail();

    return response()->json($perfil);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerfilRequest $request): JsonResponse
    {
        $perfil = Perfil::create($request->validated());

        return response()->json($perfil->load(['usuario', 'nave']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Perfil $perfil): JsonResponse
    {
        return response()->json($perfil->load(['usuario', 'nave']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerfilRequest $request, Perfil $perfil): JsonResponse
    {
        $perfil->update($request->validated());

        return response()->json($perfil->fresh(['usuario', 'nave']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perfil $perfil): JsonResponse
    {
        $perfil->delete();

        return response()->json(null, 204);
    }
}







