@extends('layouts.admin')

@section('content')

<h1 class="mb-4">📊 Dashboard</h1>

<div class="row g-3 mb-4">
    <div class="col-md-3">
        <div class="card shadow-sm">
            <div class="card-body">
                <h6>Usuarios</h6>
                <h3>{{ $usuariosCount ?? 0 }}</h3>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card shadow-sm">
            <div class="card-body">
                <h6>Roles</h6>
                <h3>{{ $rolesCount ?? 0 }}</h3>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card shadow-sm">
            <div class="card-body">
                <h6>Permisos</h6>
                <h3>{{ $permisosCount ?? 0 }}</h3>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card shadow-sm">
            <div class="card-body">
                <h6>Niveles</h6>
                <h3>{{ $nivelesCount ?? 0 }}</h3>
            </div>
        </div>
    </div>
</div>

{{-- Listados rápidos --}}
<div class="row">
    <div class="col-md-6">
        <h5>👤 Últimos usuarios</h5>
        <table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                @foreach($usuarios as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="col-md-6">
        <h5>🏆 Ranking reciente</h5>
        <table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Jugador</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                @foreach($ranking as $r)
                <tr>
                    <td>{{ $r->user->name }}</td>
                    <td>{{ $r->points }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection
