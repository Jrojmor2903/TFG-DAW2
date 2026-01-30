<?php

namespace App\Http\Controllers;

use App\Models\RankingView;
use Illuminate\Http\Request;

class RankingViewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('ranking.index');
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
    public function show(RankingView $rankingView)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RankingView $rankingView)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RankingView $rankingView)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RankingView $rankingView)
    {
        //
    }
}
