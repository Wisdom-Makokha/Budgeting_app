<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes not requiring authentication
Route::post("/createUser", [UserController::class, 'createUser']);
Route::post('/login', [UserController::class,'login']);
Route::get('/getUser', [UserController::class,'getUser']);

Route::group(['middleware' => ['auth:sanctum']], function ()
{
    // user routes
    Route::put('/updateUser', [UserController::class,'updateUser']);
    Route::delete('/deleteUser', [UserController::class,'deleteUser']);
    Route::post('/logout', [UserController::class,'logout']);
});