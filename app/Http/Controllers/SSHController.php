<?php

namespace App\Http\Controllers;

use App\Models\SSH;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SSHController extends Controller
{
    public function index()
    {
        $ssh = SSH::all();
        return Inertia::render('Home', [
            'title' => 'proyekSSH',
            'ssh' => $ssh
        ]);
    }
}
