@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Detalle del Permiso</h1>
    <div>
        <a href="{{ route('permiso.edit', $permiso->id) }}" class="btn btn-warning btn-sm">
            Editar
        </a>
        <a href="{{ route('permiso.index') }}" class="btn btn-secondary btn-sm">
            Volver
        </a>
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

    <table class="table table-sm">
        <tr>
            <th width="200">ID</th>
            <td>{{ $permiso->id }}</td>
        </tr>
        <tr>
            <th>Nombre</th>
            <td>{{ $permiso->nombre }}</td>
        </tr>

        <tr>
            <th>Roles</th>
            <td>
                {{ $permiso->roles->pluck('nombre')->join(', ') ?? '—' }}
            </td>
        </tr>
        <tr>
            <th>Fecha creación</th>
            <td>{{ $permiso->created_at->format('d/m/Y H:i') }}</td>
        </tr>
        <tr>
            <th>Última actualización</th>
            <td>{{ $permiso->updated_at->format('d/m/Y H:i') }}</td>
        </tr>
    </table>

</div>

</div>

@endsection
