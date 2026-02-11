<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = User::paginate(5);
        return UsuarioResource::collection($usuarios);
    }

    public function store(Request $request)
    {
        $userRole  = Rol::where('slug', 'user')->first();
        $usuario = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $usuario->roles()->syncWithoutDetaching([$userRole->id]);
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }
}
