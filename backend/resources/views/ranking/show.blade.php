@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">🚀 Detalle de Ranking</h1>
    <div>
        <a href="{{ route('ranking.edit', $ranking->id) }}" class="btn btn-warning btn-sm">
            Editar
        </a>
        <a href="{{ route('ranking.index') }}" class="btn btn-secondary btn-sm">
            Volver
        </a>
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-sm">
            <tr>
                <th width="200">ID</th>
                <td>
                    {{ $ranking->id }}
                </td>
            </tr>
            <tr>
                <th>Usuario</th>
                <td>{{ $ranking->user->name }}</td>
            </tr>
            <tr>
                <th>Posición</th>
                <td>{{ $ranking->posicion }}</td>
            </tr>
            <tr>
                <th>Puntuación</th>
                <td>
                    {{ $ranking->puntuacion}}
                </td>
            </tr>
            <tr>
                <th>Fecha de partida</th>
                <td>
                    {{ $ranking->fecha_partida}}
                </td>
            </tr>
        </table>

    </div>

</div>

@endsection