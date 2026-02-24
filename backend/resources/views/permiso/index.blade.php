@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Permisos</h1>
    <a href="{{ route('permiso.create') }}" class="btn btn-primary btn-sm">
        + Nuevo Permiso
    </a>
</div>

<table class="table table-hover table-striped table-sm mb-0">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol Asignado</th>
            <th>Creado</th>
            <th class="text-end">Acciones</th>
        </tr>
    </thead>
    <tbody>
        @forelse($permisos as $permiso)
        <tr>
            <td>{{ $permiso->id }}</td>
            <td>{{ $permiso->nombre }}</td>

            <td style="min-width:200px;">
                @if($permiso->roles->isNotEmpty())
                <details>
                    <summary style="cursor:pointer;">
                        {{ $permiso->roles->count() }} Roles asignado
                    </summary>

                    <ul class="mb-0 ps-3">
                        @foreach($permiso->roles as $rol)
                        <li>{{ $rol->nombre }}</li>
                        @endforeach
                    </ul>
                </details>
                @else
                Sin roles asignado
                @endif
            </td>

            <td>{{ $permiso->created_at->format('d/m/Y') }}</td>

            <td class="text-end">
                <a href="{{ route('permiso.show', $permiso->id) }}" class="btn btn-info btn-sm me-2">
                    Ver
                </a>
                <a href="{{ route('permiso.edit', $permiso->id) }}" class="btn btn-warning btn-sm me-2">
                    Editar
                </a>

                <form action="{{ route('permiso.destroy', $permiso->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que deseas eliminar este permiso?')"
                    class="d-inline-block">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="6" class="text-center py-3">
                No hay permisos registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection