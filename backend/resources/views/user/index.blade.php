@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Usuarios</h1>
    <a href="{{ route('user.deleted') }}" class="btn btn-danger btn-sm">
        Usuarios Eliminados
    </a>
    <a href="{{ route('user.create') }}" class="btn btn-primary btn-sm">
        + Nuevo Usuario
    </a>
</div>

<table class="table table-hover table-striped table-sm mb-0">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Creado</th>
            <th class="text-end">Acciones</th>
        </tr>
    </thead>
    <tbody>
        @forelse($usuarios as $user)
        <tr>
            <td class="d-flex align-items-center">
                <img
                    src="{{ $user->avatar_url ?? '' }}"
                    alt="Avatar de {{ $user->name }}"
                    class="avatar rounded-circle me-2"
                    style="width:40px; height:40px; object-fit:cover;">
                {{ $user->id }}
            </td>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>
                {{ $user->roles->pluck('nombre')->join(', ') ?? '—' }}
            </td>
            <td>{{ $user->created_at->format('d/m/Y') }}</td>
            <td class="text-end">
                <a href="{{ route('user.show', $user->id) }}"
                    class="btn btn-info btn-sm">
                    Ver
                </a>
                <a href="{{ route('user.edit', $user->id) }}"
                    class="btn btn-warning btn-sm">
                    Editar
                </a>

                <a href="{{ route('user.delete', $user->id) }}"
                    class="btn btn-danger btn-sm">
                    Eliminar
                </a>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="6" class="text-center py-3">
                No hay usuarios registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection