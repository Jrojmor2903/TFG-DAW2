<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ImagenService;
use Illuminate\Http\Request;

class ImagenController extends Controller
{
    protected $imagenService;

    public function __construct(ImagenService $imagenService)
    {
        $this->imagenService = $imagenService;
    }

    public function updateAvatar(Request $request, $id)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = User::findOrFail($id);

        if ($user->avatar_url) {
            $this->imagenService->deleteImageField($user, 'avatar_url');
        }

        $url = $this->imagenService->subir(
            $request->file('avatar'),
            $request->nombreImg ?? $user->name
        );

        $user->avatar_url = $url;
        $user->save();

        return response()->json($user);
    }
}