<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SSHController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthCustom;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [SSHController::class, 'index'])->name('home');
Route::get('/user/daftar-user', [UserController::class, 'index'])->name('user.daftar');

Route::post('/reset-modal', function () {
    session(['showLoginModal' => false]);
    return back();
})->name('modal.reset');

Route::middleware('authCustom')->group(function () {
    Route::get('/ssh', [SSHController::class, 'ssh'])->name('ssh');
    Route::get('/export', [SSHController::class, 'export'])->name('export.ssh');

    Route::middleware('admin')->group(function () {
        Route::get('/ssh/tambah', [SSHController::class, 'create'])->name('tambah.ssh');
        Route::post('/store', [SSHController::class, 'store'])->name('store');
        Route::post('/import', [SSHController::class, 'import'])->name('import.ssh');
    });
});


// Route::get('/ssh/tambah', function () {
//     return Inertia::render('Tambah');
// })->middleware(['verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
