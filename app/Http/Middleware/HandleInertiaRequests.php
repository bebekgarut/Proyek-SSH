<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $isAuthenticated = Auth::check();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message')
            ],
            'showLoginModal' => fn() => !$isAuthenticated && $request->route()->middleware('auth') !== null,
        ];
    }

    // protected function redirectTo(Request $request): ?string
    // {
    //     if ($request->expectsJson() || $request->inertia()) {
    //         abort(401, 'Unauthenticated.');
    //     }

    //     return null;
    // }
}
