<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::select(['id', 'name', 'email', 'role'])
            ->get();
        return
            Inertia::render('User', [
                'title' => 'Daftar User',
                'user' => $user
            ]);
    }

    public function edit($id)
    {
        $user = User::select(['id', 'name'])->find($id);
        return inertia::render('Auth/UpdateUser', [
            'title' => 'Edit User',
            'user' => $user
        ]);
    }
}
