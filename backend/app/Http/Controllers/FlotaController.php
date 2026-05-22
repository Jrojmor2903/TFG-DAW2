<?php

namespace App\Http\Controllers;

use App\Models\Flota;
use Illuminate\Http\Request;

class FlotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('flota.index');
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
    public function show(Flota $flota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flota $flota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flota $flota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flota $flota)
    {
        //
    }
}
