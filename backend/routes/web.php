<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\PermisoController;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\FlotaController;
use App\Http\Controllers\EnemigoController;


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/', [DashboardController::class, "index"])->name("dashboard");

    Route::resource('users', UserController::class);
    Route::resource('roles', RolController::class);
    Route::resource('permisos', PermisoController::class);



    // ======================
    // CONTENIDO
    // ======================
    Route::resource('niveles', NivelController::class);
    Route::resource('ranking', RankingController::class);
    Route::resource('enemigos', EnemigoController::class);
    Route::resource('flotas', FlotaController::class);
});
