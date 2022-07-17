<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password is incorrect'
            ]);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Register new User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register()
    {
        $newUser = [
            'display_name' => request('fullName'),
            'email' => request('email'),
            'password' => Hash::make(request('password'))
        ];

        try {
            // $user = User::create($newUser);
            DB::table('users')->insert($newUser);
            return response()->json(['success' => 'Registered successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Registration error']);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'token' => [
                'user_access_token' => $token,
                'expires_in' => auth()->factory()->getTTL() * 60
            ],
            'user' => auth()->user()]);
    }
}
