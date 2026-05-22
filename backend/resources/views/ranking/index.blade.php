@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Gestión de Rankings</h1>

    <a href="{{ route('ranking.create') }}" class="btn btn-primary btn-sm">
        + Nueva ranking
    </a>
</div>

<table class="table table-hover table-striped table-sm mb-0">
    <thead class="table-light">
        <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Posición</th>
            <th>Puntuación</th>
            <th>Fecha de partida</th>

            <th class="text-end">Acciones</th>
        </tr>
    </thead>
    <tbody>
        @forelse($rankings as $ranking)
        <tr>
            <td>{{ $ranking->id }}</td>
            <td>{{ $ranking->user->name }}</td>
            <td>{{ $ranking->posicion }}</td>
            <td>
                {{ $ranking->puntuacion }}
            </td>
            <td>{{ substr($ranking->fecha_partida, 0, 10)  }}</td>

            <td class="text-end">
                <a href="{{ route('ranking.show', $ranking->id) }}"
                    class="btn btn-info btn-sm">
                    Ver
                </a>
                <a href="{{ route('ranking.edit', $ranking->id) }}"
                    class="btn btn-warning btn-sm">
                    Editar
                </a>

                <form action="{{ route('ranking.destroy', $ranking->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que deseas eliminar esta ranking?')"
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
                No hay Rankings registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

</div>

@endsection