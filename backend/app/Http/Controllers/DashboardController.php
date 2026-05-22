<?php

namespace App\Http\Controllers;

use App\Models\Enemigo;
use App\Models\User;
use App\Models\Rol;
use App\Models\Permiso;
use App\Models\Nave;
use App\Models\RankingView;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('dashboard.index', [
            'usuariosCount' => User::count(),
            'rolesCount' => Rol::count(),
            'permisosCount' => Permiso::count(),
            'navesCount' => Nave::count(),
            'usuarios' => User::latest()->limit(5)->get(),
            'ranking' => RankingView::all(),
        ]);
    }
}
