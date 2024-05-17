<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    protected $users = [
            
        ['email' => 'jhon@example.com', 'id' => 1, 'name' => 'John'],
        ['email' => 'maks@example.com', 'id' => 2, 'name'=> 'Maks'],
        ['email' => 'ivan@example.com', 'id' => 3, 'name' => 'Ivan'],
    ];
    
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['signup']]);
    }

    public function signup(SignupRequest $request)
    {
        $data  = $request->validated();
        $existingUser =  collect($this->users)->firstWhere('email', $data['email']);
        if ($existingUser) {
            Log::channel('registration')->info('Registration attempt with existing email: ' . $data['email']);
            return response()->json(['message'=> 'Пользователь с таким email уже существует',
                                    'errors' => ['email'=>['Пользователь с таким email уже существует']]], 422);
        }

        $newUser = [
            'id' => count($this->users) + 1,
            'name' => $data['name'],
            'email' => $data['email']
        ];
        $this->users[] = $newUser;
        Log::channel('registration')->info('Successful registration for email: ' . $data['email']);
        return response()->json(['message' => 'User created successfully', 'user' => $newUser], 201);
    }
}
