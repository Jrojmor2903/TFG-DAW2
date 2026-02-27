<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rol;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRolRequest;
use App\Http\Requests\UpdateRolRequest;
use App\Services\RolService;

class RolController extends Controller
{
    protected $rolService;

    public function __construct(RolService $rolService)
    {
        $this->rolService = $rolService;
    }


    public function index()
    {
        $roles = Rol::with('permisos')->get();

        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    public function store(StoreRolRequest $request)
    {
        $rol = $this->rolService->createDefault($request);

        return response()->json([
            'success' => true,
            'message' => 'Rol creado correctamente',
            'data' => $rol->load('permisos')
        ], 201);
    }


    public function show(Rol $rol)
    {
        return response()->json([
            'success' => true,
            'data' => $rol->load('permisos')
        ]);
    }


    public function update(UpdateRolRequest $request, Rol $rol)
    {
        $rolActualizado = $this->rolService->updateDefault($request, $rol);

        return response()->json([
            'success' => true,
            'message' => 'Rol actualizado correctamente',
            'data' => $rolActualizado->load('permisos')
        ]);
    }


    public function destroy(Rol $rol)
    {
        $rol->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rol eliminado correctamente'
        ]);
    }
}