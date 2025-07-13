<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            return $next($request);
        }

        if (!$request->hasCookie('modal_dismissed')) {
            Log::info('📢 Middleware: Flash showLoginModal karena belum ada cookie');
            Session::flash('showLoginModal', true);
        } else {
            Log::info('❌ Middleware: Tidak flash modal karena cookie sudah ada');
        }

        return redirect()->route('home');
    }
}
