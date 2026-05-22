<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use App\Models\Nave;
use App\Http\Requests\StorePerfilRequest;
use App\Http\Requests\UpdatePerfilRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class PerfilController extends Controller
{

    
    
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $perfiles = Perfil::with(['usuario', 'nave'])->paginate(10);

        return view('perfiles.index', compact('perfiles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $usuarios = User::all();
        $naves    = Nave::all();

        return view('perfiles.create', compact('usuarios', 'naves'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerfilRequest $request): RedirectResponse
    {
        Perfil::create($request->validated());

        return redirect()
            ->route('perfiles.index')
            ->with('success', 'Perfil creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perfil $perfil): View
    {
        $perfil->load(['usuario', 'nave']);

        return view('perfiles.show', compact('perfil'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perfil $perfil): View
    {
        $usuarios = User::all();
        $naves    = Nave::all();

        return view('perfiles.edit', compact('perfil', 'usuarios', 'naves'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerfilRequest $request, Perfil $perfil): RedirectResponse
    {
        $perfil->update($request->validated());

        return redirect()
            ->route('perfiles.index')
            ->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perfil $perfil): RedirectResponse
    {
        $perfil->delete();

        return redirect()
            ->route('perfiles.index')
            ->with('success', 'Perfil eliminado correctamente.');
    }
}