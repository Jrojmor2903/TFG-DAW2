<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\PermisoController;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\RankingViewController;
use App\Http\Controllers\FlotaController;
use App\Http\Controllers\EnemigoController;
use App\Http\Controllers\NaveController;
use App\Http\Controllers\ImagenController;

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/', [DashboardController::class, "index"])->name("dashboard");

    Route::get('user/{usuario}/delete', [UserController::class, 'delete'])
        ->name('user.delete');

    Route::get('user/deleted', [UserController::class, 'deletedUsers'])->name('user.deleted');
    Route::post('user/{id}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{id}/force-delete', [UserController::class, 'forceDelete'])->name('user.forceDelete');

    Route::resource('user', UserController::class);

    Route::resource('rol', RolController::class);

    Route::delete('imagenes/delete', [ImagenController::class, 'deleteImagen'])->name('imagen.delete');

    Route::resource('imagen', ImagenController::class);

    Route::resource('permiso', PermisoController::class);

    Route::resource('nivel', NivelController::class);

    Route::resource('ranking', RankingViewController::class);

    Route::resource('enemigo', EnemigoController::class);

    Route::resource('nave', NaveController::class);
});
