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
use App\Http\Controllers\Api\LogroController;
use App\Http\Controllers\Api\NivelController;
use App\Http\Controllers\Api\EnemigoController;

    Route::post('login', [AuthController::class, 'login']);

    Route::post('/register', [UserController::class, 'store']);

    Route::post('/auth/check-token', [AuthController::class, 'tokenReg']);

Route::name("api.")->middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    

    Route::get('users-deleted', [UserController::class, 'deletedUsers']);
    Route::get('user/check-admin', [UserController::class, 'checkAdmin']);
    Route::post('user/equipar-nave', [UserController::class, 'equiparNave']);


    Route::post('users/{id}/restore', [UserController::class, 'restore']);
    Route::delete('users/{id}/force', [UserController::class, 'forceDelete']);
    Route::post('user/{id}/avatar', [UserController::class, 'updateAvatarProfile']);
    Route::patch('user/{id}/nivel', [UserController::class, 'actualizarNivel']);

    Route::get('mis-logros/{id}', [UserController::class, 'misLogros']);


    Route::apiResource('user', UserController::class);
    
    Route::apiResource('rol', RolController::class);


    Route::put('/perfil/usuario/{id}', [PerfilController::class, 'update']);
    Route::put('/perfil/usuario/{id}/nave', [PerfilController::class, 'updateNave']);


    Route::apiResource('perfil', PerfilController::class);
    Route::apiResource('permiso', PermisoController::class);
    
    Route::apiResource('logro', LogroController::class);

    Route::apiResource('ranking', RankingController::class);

    Route::apiResource('nave', NaveController::class);
    
    Route::get('nivel/total', [NivelController::class, 'total']);
    Route::get('nivel/creadores', [NivelController::class, 'obtenerCreadores']);
    Route::get('nivel/creados', [NivelController::class, 'creados']);
    Route::apiResource('nivel', NivelController::class);


    Route::apiResource('enemigo', EnemigoController::class);
});
