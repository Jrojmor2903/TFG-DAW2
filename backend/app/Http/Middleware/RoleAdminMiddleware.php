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
        $user = Auth::user();

        // Si no hay usuario logueado → 403
        if (!$user) {
            abort(403, 'Acceso denegado');
        }

        // Revisar si el usuario tiene asignado el rol
        $tieneRol = $user->roles()->where('slug', $roleSlug)->exists();

        if (!$tieneRol) {
            abort(403, 'Acceso denegado');
        }

        return $next($request);
    }
}