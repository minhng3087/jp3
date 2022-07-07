<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class UserController extends Controller
{  
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>"Login không thành công!"], 401);      
        }
        $credentials = $request->only('email', 'password');
        $user = User::where("email",$request->email)->first();
        if(Auth::attempt($credentials)){
            return response()->json($user);
        }
        return response()->json(['error'=>"Login không thành công!"], 401);  

    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'password_confirm' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }

        $user = User::create($request->all());
  
        return response()->json($user, 200);
    }

    public function index() {
        return 1;
    }
}