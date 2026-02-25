<?php

namespace App\Http\Controllers;

use App\Models\Nave;
use Illuminate\Http\Request;

class NaveController extends Controller
{
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
    public function show(Nave $nave)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nave $nave)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nave $nave)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nave $nave)
    {
        //
    }
}
