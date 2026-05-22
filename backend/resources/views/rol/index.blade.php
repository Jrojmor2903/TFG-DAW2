@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Roles</h1>
    <a href="{{ route('rol.create') }}" class="btn btn-primary btn-sm">
        + Nuevo rol
    </a>
</div>

<table class="table table-hover table-striped table-sm mb-0">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Permisos</th>
            <th>Usuarios</th>
            <th class="text-end">Acciones</th>
        </tr>
    </thead>
    <tbody>
        @forelse($roles as $rol)
        <tr>
            <td>{{ $rol->id }}</td>
            <td>{{ $rol->nombre }}</td>
            <td>
                {{ $rol->slug }}
            </td>
            <td style="min-width:200px;">
                @if($rol->permisos->isNotEmpty())
                <details>
                    <summary style="cursor:pointer;">
                        {{ $rol->permisos->count() }} Permisos asignado
                    </summary>

                    <ul class="mb-0 ps-3">
                        @foreach($rol->permisos as $permiso)
                        <li>{{ $permiso->nombre }}</li>
                        @endforeach
                    </ul>
                </details>
                @else
                Sin permisos asignado
                @endif
            </td>

            <td style="min-width:200px;">
                @if($rol->usuario->isNotEmpty())
                <details>
                    <summary style="cursor:pointer;">
                        {{ $rol->usuario->count() }} Usuarios asignado
                    </summary>

                    <ul class="mb-0 ps-3">
                        @foreach($rol->usuario as $usuario)
                        <li>{{ $usuario->name }}</li>
                        @endforeach
                    </ul>
                </details>
                @else
                Sin usuarios asignado
                @endif
            </td>

            <td class="text-end">
                <a href="{{ route('rol.show', $rol->id) }}" class="btn btn-info btn-sm me-2">
                    Ver
                </a>
                <a href="{{ route('rol.edit', $rol->id) }}" class="btn btn-warning btn-sm me-2">
                    Editar
                </a>

                <form action="{{ route('rol.destroy', $rol->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que deseas eliminar este rol?')"
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
                No hay roles registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection