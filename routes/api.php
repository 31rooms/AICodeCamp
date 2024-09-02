<?php

use App\Http\Controllers\API\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProgramController;

Route::post('login', [LoginController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::get('users', [UserController::class, 'index']);
    Route::resource('programs', ProgramController::class)->only('index','show');
});
