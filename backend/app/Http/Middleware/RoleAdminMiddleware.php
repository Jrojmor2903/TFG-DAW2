<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleAdminMiddleware
{
    public function handle(Request $request, Closure $next, $roleSlug): Response
    {
        $user = $request->user();
        
        if (!$user->hasRole($roleSlug)) {
            abort(403, "Acesso denegado");
        }

        return $next($request);
    }
}
