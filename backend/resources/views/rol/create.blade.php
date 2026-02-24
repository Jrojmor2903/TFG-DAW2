@extends('layouts.admin')

@section('content')

<h1 class="mb-4">➕ Crear Rol</h1>

@if ($errors->any())
<div class="alert alert-danger"> <strong>Ups...</strong> Hay errores en el formulario. <ul class="mb-0 mt-2">

        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>

</div>
@endif

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('rol.store') }}" method="POST">
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
                <label class="form-label">Permisos</label>
                <select name="permiso[]" class="form-select" multiple required>
                    @foreach($permisos as $permiso)
                    <option value="{{ $permiso->id }}">
                        {{ $permiso->nombre }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('rol.index') }}" class="btn btn-secondary btn-sm">
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