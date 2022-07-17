<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return response()->json(array("token" => $token));
});

Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'login']);
    Route::middleware('auth:api')->group(function () {
        Route::get('me', [UserAuthController::class, 'me']);
        Route::get('logout', [UserAuthController::class, 'logout']);
    });
});

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getSingleProduct']);
Route::get('/orders', [OrderController::class, 'getAllOrders']);
Route::get('/orders/{id}', [OrderController::class, 'getOrderDetail']);
Route::post('/postOrder', [OrderController::class, 'postOrder']);

Route::prefix('admin')->group(function () {
    Route::post('login', [AdminAuthController::class, 'login']);
});
