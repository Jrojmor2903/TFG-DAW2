<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNaveRequest;
use App\Models\Nave;
use Illuminate\Http\Request;
use App\Services\NaveService;

class NaveController extends Controller
{

    protected $naveService;

    public function __construct(

        NaveService $naveService,

    ) {
        $this->naveService = $naveService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $naves = Nave::all();
        return view('nave.index', compact('naves'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('nave.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNaveRequest $request)
    {
        $this->naveService->createDefault($request);
        return redirect()->route('nave.index')->with('success', 'Nave creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Nave $nave)
    {
        return view('nave.show', compact('nave'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
            $nave = Nave::find($id);
            return view('nave.edit', compact('nave'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nave $nave)
    {
        $this->naveService->updateDefault($request, $nave);
        return redirect()->route('nave.index')->with('success', 'Nave actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $nave = Nave::findOrFail($id);
        $this->naveService->deleteDefault($nave->avatar_url);
        $nave->delete();

        return redirect()->route('nave.index')
            ->with('success', 'Nave eliminado correctamente');
    }
}
