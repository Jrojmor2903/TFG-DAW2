@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Detalle de Usuario</h1>
    <div>
        <a href="{{ route('user.edit', $user->id) }}" class="btn btn-warning btn-sm">
            Editar
        </a>
        <a href="{{ route('user.index') }}" class="btn btn-secondary btn-sm">
            Volver
        </a>
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

    <table class="table table-sm">
        <tr>
            <th width="200">ID</th>
            <td>{{ $user->id }}</td>
        </tr>
        <tr>
            <th>Nombre</th>
            <td>{{ $user->name }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $user->email }}</td>
        </tr>
        <tr>
            <th>Roles</th>
            <td>
                {{ $user->roles->pluck('nombre')->join(', ') ?? '—' }}
            </td>
        </tr>
        <tr>
            <th>Fecha creación</th>
            <td>{{ $user->created_at->format('d/m/Y H:i') }}</td>
        </tr>
        <tr>
            <th>Última actualización</th>
            <td>{{ $user->updated_at->format('d/m/Y H:i') }}</td>
        </tr>
    </table>

</div>

</div>

@endsection
