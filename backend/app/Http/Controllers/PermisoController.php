<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermisoRequest;
use App\Http\Requests\UpdatePermisoRequest;
use App\Models\Permiso;
use App\Models\Rol;
use Illuminate\Http\Request;
use App\Services\PermisoService;
use Illuminate\View\Component;

class PermisoController extends Controller
{

    protected $permisoService;

    public function __construct(
       PermisoService $permisoService,
    )
    {
        $this->permisoService= $permisoService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permisos = Permiso::all();
        return view('permiso.index', compact('permisos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Rol::all();
        return view('permiso.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermisoRequest $request)
    {
        $this->permisoService->createDefault($request);
        return redirect()->route('permiso.index')->with('success', 'Permiso creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Permiso $permiso)
    {
        return view('permiso.show', compact('permiso'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permiso $permiso)
    {
        $roles = Rol::all();
        return view('permiso.edit', compact('permiso','roles'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermisoRequest $request, Permiso $permiso)
    {
        $this->permisoService->updateDefault($request, $permiso);
        return redirect()->route('permiso.index')->with('success', 'Permiso actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $permiso = Permiso::findOrFail($id);
        $permiso->delete();

        return redirect()->route('permiso.index')
            ->with('success', 'Permiso eliminado correctamente');
    }
}
