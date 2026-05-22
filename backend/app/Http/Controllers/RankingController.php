<?php

namespace App\Http\Controllers;

use App\Http\Requests\RankingRequest;
use App\Models\Ranking;
use App\Models\RankingView;
use App\Models\User;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rankings = RankingView::orderBy('posicion')->get();
        return view('ranking.index', compact('rankings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        return view('ranking.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RankingRequest $request)
    {
        Ranking::create($request->validated());

        return redirect()->route('ranking.index')
            ->with('success', 'Ranking creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(RankingView $ranking)
    {
        return view('ranking.show', compact('ranking'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ranking $ranking)
    {
        $users = User::all();
        return view('ranking.edit', compact('users', 'ranking'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RankingRequest $request, Ranking $ranking)
    {
        $ranking->update($request->validated());

        return redirect()->route('ranking.index')
            ->with('success', 'Ranking actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ranking = Ranking::findOrFail($id);

        $ranking->delete();

        return redirect()->route('nave.index')
            ->with('success', 'Ranking eliminado correctamente');
    }
}
