<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PermisoController;
use App\Http\Controllers\Api\RankingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RolController;
use App\Http\Controllers\Api\NaveController;
use App\Http\Controllers\Api\PerfilController;

Route::post('login', [AuthController::class, 'login']);

Route::post('/register', [UserController::class, 'store']);

Route::name("api.")->middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::get('users-deleted', [UserController::class, 'deletedUsers']);
    Route::post('users/{id}/restore', [UserController::class, 'restore']);
    Route::delete('users/{id}/force', [UserController::class, 'forceDelete']);

    Route::post('/register', [UserController::class, 'store']);


    Route::apiResource('rol', RolController::class);

    Route::post('perfil/getByUserId', [PerfilController::class, 'getByUserId']);

    Route::apiResource('perfil', PerfilController::class);
    Route::apiResource('permiso', PermisoController::class);

    Route::apiResource('ranking', RankingController::class);

    Route::apiResource('nave', NaveController::class);
});
