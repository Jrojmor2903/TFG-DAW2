<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $usuarios = User::with('roles')->get();

        return response()->json([
            'success' => true,
            'data' => $usuarios
        ]);
    }


    public function store(StoreUserRequest $request)
    {
        $usuario = $this->userService->createDefault($request);

        return response()->json([
            'success' => true,
            'message' => 'Usuario creado correctamente',
            'data' => $usuario->load('roles')
        ], 201);
    }


    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'data' => $user->load('roles')
        ]);
    }


    public function update(UpdateUserRequest $request, User $user)
    {
        $usuario = $this->userService->updateDefault($request, $user);

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado correctamente',
            'data' => $usuario->load('roles')
        ]);
    }


    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    }


    public function deletedUsers()
    {
        $usuarios = User::onlyTrashed()->with('roles')->get();

        return response()->json([
            'success' => true,
            'data' => $usuarios
        ]);
    }


    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return response()->json([
            'success' => true,
            'message' => 'Usuario restaurado correctamente'
        ]);
    }


    public function forceDelete($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);

        $this->userService->deleteDefault($user->avatar_url);
        $user->forceDelete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado permanentemente'
        ]);
    }
}
