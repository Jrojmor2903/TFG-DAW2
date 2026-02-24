@extends('layouts.admin')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">👤 Detalle del Rol</h1>
    <div>
        <a href="{{ route('rol.edit', $rol->id) }}" class="btn btn-warning btn-sm">
            Editar
        </a>
        <a href="{{ route('rol.index') }}" class="btn btn-secondary btn-sm">
            Volver
        </a>
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

        <table class="table table-sm">
            <tr>
                <th width="200">ID</th>
                <td>{{ $rol->id }}</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>{{ $rol->nombre }}</td>
            </tr>

            <tr>
                <th>Permisos</th>
                <td style="min-width:200px;">
                    @if($rol->permisos->isNotEmpty())
                    <details>
                        <summary style="cursor:pointer;">
                            {{ $rol->permisos->count() }} Permisos
                        </summary>

                        <ul class="mb-0 ps-3">
                            @foreach($rol->permisos as $permiso)
                            <li>{{ $permiso->nombre }}</li>
                            @endforeach
                        </ul>
                    </details>
                    @else
                    —
                    @endif
                </td>
            </tr>
            <tr>
                <th>Fecha creación</th>
                <td>{{ $rol->created_at->format('d/m/Y H:i') }}</td>
            </tr>
            <tr>
                <th>Última actualización</th>
                <td>{{ $rol->updated_at->format('d/m/Y H:i') }}</td>
            </tr>
        </table>

    </div>

</div>

@endsection