<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function actualizarNivel($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->nivel_actual = $request->nivel_actual;
        $user->save();
        return response()->json($user);
    }
    
    public function equiparNave(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $user->perfil()->update(['id_nave' => $request->nave_id]);
        return response()->json(['ok' => true]);
    }
    public function checkAdmin(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token inválido o ausente en las cabeceras de Axios.'
                ], 401);
            }

            $userId = $user->id;
            
            $isAdmin = DB::table('asignaciones')
                ->join('roles', 'asignaciones.id_rol', '=', 'roles.id')
                ->where('asignaciones.id_user', $userId)
                ->where('roles.slug', 'admin')
                ->exists();

            if (!$isAdmin) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario autenticado correctamente, pero no cuenta con el rol de admin.'
                ], 403);
            }

            return response()->json([
                'success' => true,
                'message' => 'Acceso concedido.'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error_class' => get_class($e),
                'error_message' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_file' => $e->getFile()
            ], 500);
        }
    }

    public function misLogros($id)
    {
        $user = User::findOrFail($id);
        $logros = $user->logros()->get();
        return response()->json($logros);
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
