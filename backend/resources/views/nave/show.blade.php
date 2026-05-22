@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">🚀 Detalle de Nave</h1>
    <div>
        <a href="{{ route('nave.edit', $nave->id) }}" class="btn btn-warning btn-sm">
            Editar
        </a>
        <a href="{{ route('nave.index') }}" class="btn btn-secondary btn-sm">
            Volver
        </a>
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-sm">
            <tr>
                <th width="200">ID</th>
                <td class="d-flex align-items-center">
                    <img
                        src="{{ $nave->avatar_url ?? '' }}"
                        alt="Avatar de {{ $nave->name }}"
                        class="avatar rounded-circle me-2"
                        style="width:40px; height:40px; object-fit:cover;">
                    {{ $nave->id }}
                </td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>{{ $nave->nombre }}</td>
            </tr>
            <tr>
                <th>Vida</th>
                <td>{{ $nave->vida }}</td>
            </tr>
            <tr>
                <th>Daño</th>
                <td>
                    {{ $nave->poder_disparo}}
                </td>
            </tr>
            <tr>
                <th>Cadencia</th>
                <td>
                    {{ $nave->cadencia}}
                </td>
            </tr>
            <tr>
                <th>Precio</th>
                <td>
                    {{ $nave->precio}}
                </td>
            </tr>
        </table>

    </div>

</div>

@endsection