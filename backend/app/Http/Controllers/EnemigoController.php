<?php

namespace App\Http\Controllers;

use App\Models\Enemigo;
use Illuminate\Http\Request;

class EnemigoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('enemigo.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Enemigo $enemigo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enemigo $enemigo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enemigo $enemigo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enemigo $enemigo)
    {
        //
    }
}
