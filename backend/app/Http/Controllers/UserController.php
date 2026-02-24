<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Rol;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;

class UserController extends Controller
{

    protected $userService;


    public function __construct(

        UserService $userService,

    ) {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::all();
        return view('user.index', compact('usuarios'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Rol::all();
        return view('user.create', compact('roles'));
    }

    public function store(StoreUserRequest $request)
    {
        $this->userService->createDefault($request);
        return redirect()->route('user.index')
            ->with('success', 'Usuario creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return view('user.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Rol::all();
        return view('user.edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $this->userService->updateDefault($request, $user);

        return redirect()->route('user.index')
            ->with('success', 'Usuario actualizado correctamente');
    }


    public function delete($id)
    {
        $usuario = User::findOrFail($id);
        return view('user.delete', compact('usuario'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index')
            ->with('success', 'Usuario eliminado correctamente');
    }


    public function deletedUsers()
    {
        $usuarios = User::onlyTrashed()->with('roles')->get();
        return view('user.deleted', compact('usuarios'));
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return redirect()->route('user.deleted')
            ->with('success', 'Usuario restaurado correctamente');
    }

    public function forceDelete($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->forceDelete();

        return redirect()->route('user.deleted')
            ->with('success', 'Usuario eliminado permanentemente');
    }
}
