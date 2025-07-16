<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::select(['name', 'email', 'role'])
            ->get();
        return
            Inertia::render('User', [
                'title' => 'Daftar User',
                'user' => $user
            ]);
    }
}
