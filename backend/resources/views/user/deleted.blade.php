@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Usuarios Eliminados</h1>

    <a href="{{ route('user.index') }}" class="btn btn-secondary btn-sm">
        Volver
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
                <img src="{{ $user->avatar_url ?? 'https://i.pinimg.com/736x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg' }}"
                    alt="Avatar de {{ $user->name }}"
                    class="rounded-circle me-2"
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
                <form action="{{ route('user.restore', $user->id) }}" method="POST" class="d-inline">
                    @csrf
                    <button class="btn btn-success btn-sm">Restaurar</button>
                </form>

                <form action="{{ route('user.forceDelete', $user->id) }}" method="POST" class="d-inline">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm">Eliminar permanentemente</button>
                </form>
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