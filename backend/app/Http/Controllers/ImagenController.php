<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Nave;
use App\Models\Nivel;
use App\Services\ImagenService;
use App\Http\Requests\ImagenDeleteRequest;

class ImagenController extends Controller
{
    protected $imagenService;

    public function __construct(

        ImagenService $imagenService,

    ) {
        $this->imagenService = $imagenService;
    }

    public function index()
    {
        $imagenes = collect();

        foreach (User::all() as $user) {
            if ($user->avatar_url) {
                $imagenes->push([
                    'url' => $user->avatar_url,
                    'model' => 'User',
                    'id' => $user->id,
                    'field' => 'avatar_url',
                ]);
            }
        }

        foreach (Nave::all() as $nave) {
            if ($nave->avatar_url) {
                $imagenes->push([
                    'url' => $nave->avatar_url,
                    'model' => 'Nave',
                    'id' => $nave->id,
                    'field' => 'avatar_url',
                ]);
            }
        }

        foreach (Nivel::all() as $nivel) {
            if ($nivel->fondo_url) {
                $imagenes->push([
                    'url' => $nivel->fondo_url,
                    'model' => 'Nivel',
                    'id' => $nivel->id,
                    'field' => 'fondo_url',
                ]);
            }
        }

        return view('imagen.index', compact('imagenes'));
    }
    public function delete(ImagenDeleteRequest $request)
    {
        $modelClass = 'App\\Models\\' . $request->model;
        $model = $modelClass::findOrFail($request->id);

        $this->imagenService->deleteImageField($model, $request->field);

        return back()->with('success', 'Imagen eliminada');
    }
}
