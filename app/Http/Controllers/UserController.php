<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    // create the crud
    public function createUser(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "email" => "required|string|unique:users,email",
            "password" => "required|string|confirmed"
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        Auth::login($user);
        $token = $request->user()->createToken($request->token_name);

        return response(
            [
                'message' => 'user created successfully',
                'token' => $token,
                'user' => $user
            ],
            201
        );
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|min:8|string|confirmed'
        ]);

        $user = User::find( $id );

        if(!$user)
            return response()->json(['message' => 'Unaothorized'], 403);

        $user->update($request->all());

        return response(
            [
                'message' => 'user updated',
                'user' => $user
            ]
            ,
            200
        );
    }

    public function deleteUser(Request $request)
    {
        $user = User::find($request->input('id'));

        if (!$user)
            return response()->json(['message' => 'User not found'], 404);

        // ensure the authenticated user is deleting their own profile
        if (Auth::id() == $user->id)
            return response()->json(['message' => 'Unauthorized'], 403);

        $user->delete();

        return response(['message' => 'user deleted successfully'], 200);
    }

    public function getUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|exists:users,name'
        ]);

        $username = $request->input(key: 'name');

        $user = User::select('users.name', 'users.email', 'users.created_at', 'users.updated_at')
            ->where('users.name', $username)
            ->get();

        if ($user)
            return response([$user], 200);
        else
            return response(['message' => 'user not found'], 404);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'prohibits:name|nullable|string|email',
            'name' => 'prohibits:email|nullable|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email' == null ? 'name' : 'email', 'password');

        if (!Auth::attempt($credentials))
            return response()->json(['message' => 'Invalid credentials'], 400);

        $user = Auth::user();
        $token = $request->user()->createToken($request->name)->plainTextToken;

        return response(
            [
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ],
            200
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        Auth::logout();

        return response(['message' => 'logout successful'], 202);
    }
}
