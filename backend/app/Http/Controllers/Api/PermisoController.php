<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermisoRequest;
use App\Http\Requests\UpdatePermisoRequest;
use App\Models\Permiso;
use App\Services\PermisoService;

class PermisoController extends Controller
{
    protected $permisoService;

    public function __construct(PermisoService $permisoService)
    {
        $this->permisoService = $permisoService;
    }

    /**
     * GET /api/permisos
     */
    public function index()
    {
        $permisos = Permiso::with('roles')->get();

        return response()->json([
            'success' => true,
            'data' => $permisos
        ]);
    }

    /**
     * POST /api/permisos
     */
    public function store(StorePermisoRequest $request)
    {
        $permiso = $this->permisoService->createDefault($request);

        return response()->json([
            'success' => true,
            'message' => 'Permiso creado correctamente',
            'data' => $permiso->load('roles')
        ], 201);
    }

    /**
     * GET /api/permisos/{permiso}
     */
    public function show(Permiso $permiso)
    {
        return response()->json([
            'success' => true,
            'data' => $permiso->load('roles')
        ]);
    }

    /**
     * PUT/PATCH /api/permisos/{permiso}
     */
    public function update(UpdatePermisoRequest $request, Permiso $permiso)
    {
        $permisoActualizado = $this->permisoService->updateDefault($request, $permiso);

        return response()->json([
            'success' => true,
            'message' => 'Permiso actualizado correctamente',
            'data' => $permisoActualizado->load('roles')
        ]);
    }

    /**
     * DELETE /api/permisos/{permiso}
     */
    public function destroy(Permiso $permiso)
    {
        $permiso->delete();

        return response()->json([
            'success' => true,
            'message' => 'Permiso eliminado correctamente'
        ]);
    }
}