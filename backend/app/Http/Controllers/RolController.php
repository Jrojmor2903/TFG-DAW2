<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\Permiso;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRolRequest;
use App\Http\Requests\UpdateRolRequest;
use App\Services\RolService;

class RolController extends Controller
{
    protected $rolService;

    public function __construct(

        RolService $rolService,

    ) {
        $this->rolService = $rolService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Rol::all();
        return view('rol.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permisos = Permiso::all();
        return view('rol.create', compact('permisos'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRolRequest $request)
    {
        $this->rolService->createDefault($request);
        return redirect()->route('rol.index')->with('succes','Rol creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rol $rol)
    {
        return view('rol.show', compact('rol'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rol $rol)
    {
        $permisos = Permiso::all();
        return view('rol.edit', compact('permisos', 'rol'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRolRequest $request, Rol $rol)
    {
        $this->rolService->updateDefault($request, $rol);
        return redirect()->route('rol.index')->with('succes','Rol actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $rol = Rol::findOrFail($id);
        $rol->delete();

        return redirect()->route('rol.index')
            ->with('success', 'Rol eliminado correctamente');
    }
}
