<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RankingRequest;
use App\Models\Ranking;
use App\Models\RankingView;

class RankingController extends Controller
{

    public function index()
    {
        $rankings = RankingView::all();

        return response()->json([
            'success' => true,
            'data' => $rankings
        ]);
    }


    public function store(RankingRequest $request)
    {
        $ranking = Ranking::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Ranking creado correctamente',
            'data' => $ranking
        ], 201);
    }


    public function show($id)
    {
        $ranking = RankingView::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $ranking
        ]);
    }

    public function update(RankingRequest $request, Ranking $ranking)
    {
        $ranking->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Ranking actualizado correctamente',
            'data' => $ranking
        ]);
    }


    public function destroy(Ranking $ranking)
    {
        $ranking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ranking eliminado correctamente'
        ]);
    }
}
