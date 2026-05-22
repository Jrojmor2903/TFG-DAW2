<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreLogroRequest;
use App\Http\Requests\UpdateLogroRequest;
use App\Models\Logro;
use App\Services\LogroService;

class LogroController extends Controller
{
    public function __construct(
        protected LogroService $logroService
    ) {}

    public function index()
    {
$logros = Logro::all(); 
    
    return response()->json([
        'status' => 'success',
        'data' => $logros
    ]);
    }

    public function show(Logro $logro)
    {
        return response()->json(
            $logro->load('usuarios')
        );
    }

    public function store(StoreLogroRequest $request)
    {
        $logro = $this->logroService->store(
            $request->validated()
        );

        return response()->json($logro, 201);
    }

    public function update(
        UpdateLogroRequest $request,
        Logro $logro
    ) {
        $logro = $this->logroService->update(
            $logro,
            $request->validated()
        );

        return response()->json($logro);
    }

    public function destroy(Logro $logro)
    {
        $logro->delete();

        return response()->json([
            'message' => 'Logro eliminado correctamente'
        ]);
    }
}