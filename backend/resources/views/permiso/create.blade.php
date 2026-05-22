@extends('layouts.admin')

@section('content')

<h1 class="mb-4">➕ Crear Permiso</h1>


<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('permiso.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="nombre"
                    class="form-control"
                    value="{{ old('nombre') }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Roles</label>
                <select name="rol[]" class="form-select" multiple required>
                    @foreach($roles as $rol)
                    <option value="{{ $rol->id }}">
                        {{ $rol->nombre }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('permiso.index') }}" class="btn btn-secondary btn-sm">
                    Cancelar
                </a>
                <button type="submit" class="btn btn-success btn-sm">
                    Guardar Usuario
                </button>
            </div>

        </form>

    </div>

</div>

@endsection