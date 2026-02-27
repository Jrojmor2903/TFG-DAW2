@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Niveles</h1>

    <a href="{{ route('nivel.create') }}" class="btn btn-primary btn-sm">
        + Nuevo Nivel
    </a>
</div>

<table class="table table-hover table-striped table-sm mb-0">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Vida</th>
            <th>Daño</th>
            <th>Cadencia</th>
            <th>Precio</th>
            <th class="text-end">Acciones</th>
        </tr>
    </thead>
    <tbody>
        @forelse($niveles as $nivel)
        <tr>
            <td class="d-flex align-items-center">
                <img
                    src="{{ $nivel->avatar_url ?? '' }}"
                    alt="Avatar de {{ $nivel->name }}"
                    class="avatar rounded-circle me-2"
                    style="width:40px; height:40px; object-fit:cover;">
                {{ $nivel->id }}
            </td>
            <td>{{ $nivel->nombre }}</td>
            <td>{{ $nivel->vida }}</td>
            <td>
                {{ $nivel->poder_disparo }}
            </td>
            <td>{{ $nivel->cadencia }}</td>

            <td>{{ $nivel->precio }}</td>

            <td class="text-end">
                <a href="{{ route('nivel.show', $nivel->id) }}"
                    class="btn btn-info btn-sm">
                    Ver
                </a>
                <a href="{{ route('nivel.edit', $nivel->id) }}"
                    class="btn btn-warning btn-sm">
                    Editar
                </a>

                <a href="{{ route('nivel.delete', $nivel->id) }}"
                    class="btn btn-danger btn-sm">
                    Eliminar
                </a>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="7" class="text-center py-3">
                No hay niveles registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection