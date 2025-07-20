<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

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

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:15',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::where('id', $id)->update([
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('user.daftar')->with('message', 'User baru berhasil ditambahkan.');
    }
}
