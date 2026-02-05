<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;

Route::get('/usuarios', [UsuarioController::class, 'index']);

Route::post('/storeUser', [UsuarioController::class, 'store']);
