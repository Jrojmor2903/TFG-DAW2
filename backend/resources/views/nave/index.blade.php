@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Naves</h1>

    <a href="{{ route('nave.create') }}" class="btn btn-primary btn-sm">
        + Nueva Nave
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
        @forelse($naves as $nave)
        <tr>
            <td class="d-flex align-items-center">
                <img
                    src="{{ $nave->avatar_url ?? '' }}"
                    alt="Avatar de {{ $nave->name }}"
                    class="avatar rounded-circle me-2"
                    style="width:40px; height:40px; object-fit:cover;">
                {{ $nave->id }}
            </td>
            <td>{{ $nave->nombre }}</td>
            <td>{{ $nave->vida }}</td>
            <td>
                {{ $nave->poder_disparo }}
            </td>
            <td>{{ $nave->cadencia }}</td>

            <td>{{ $nave->precio }}</td>

            <td class="text-end">
                <a href="{{ route('nave.show', $nave->id) }}"
                    class="btn btn-info btn-sm">
                    Ver
                </a>
                <a href="{{ route('nave.edit', $nave->id) }}"
                    class="btn btn-warning btn-sm">
                    Editar
                </a>


                <form action="{{ route('nave.destroy', $nave->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que deseas eliminar esta nave?')"
                    class="d-inline-block">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="7" class="text-center py-3">
                No hay naves registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection