<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNaveRequest;
use App\Models\Nave;
use Illuminate\Http\Request;
use App\Services\NaveService;

class NaveController extends Controller
{
    protected $naveService;

    public function __construct(NaveService $naveService)
    {
        $this->naveService = $naveService;
    }

    /**
     * GET /api/naves
     */
    public function index()
    {
        $naves = Nave::all();

        return response()->json([
            'success' => true,
            'data' => $naves
        ]);
    }

    /**
     * POST /api/naves
     */
    public function store(StoreNaveRequest $request)
    {
        $nave = $this->naveService->createDefault($request);

        return response()->json([
            'success' => true,
            'message' => 'Nave creada correctamente',
            'data' => $nave
        ], 201);
    }

    /**
     * GET /api/naves/{nave}
     */
    public function show(Nave $nave)
    {
        return response()->json([
            'success' => true,
            'data' => $nave
        ]);
    }

    /**
     * PUT/PATCH /api/naves/{nave}
     */
    public function update(Request $request, Nave $nave)
    {
        $naveActualizada = $this->naveService->updateDefault($request, $nave);

        return response()->json([
            'success' => true,
            'message' => 'Nave actualizada correctamente',
            'data' => $naveActualizada
        ]);
    }

    /**
     * DELETE /api/naves/{nave}
     */
    public function destroy(Nave $nave)
    {
        $this->naveService->deleteDefault($nave->avatar_url);
        $nave->delete();

        return response()->json([
            'success' => true,
            'message' => 'Nave eliminada correctamente'
        ]);
    }
}