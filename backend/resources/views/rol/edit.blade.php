@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Rol</h1>

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('rol.update', $rol->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="nombre"
                    class="form-control"
                    value="{{ old('nombre', $rol->nombre) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Permisos</label>
                <select name="permiso[]" class="form-select" multiple required>
                    @foreach($permisos as $permiso)
                    <option value="{{ $permiso->id }}"
                        {{ $rol->permisos->contains($permiso->id) ? 'selected' : '' }}>
                        {{ $permiso->nombre }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('rol.index') }}" class="btn btn-secondary btn-sm">
                    Cancelar
                </a>
                <button type="submit" class="btn btn-primary btn-sm">
                    Actualizar
                </button>
            </div>

        </form>

    </div>


</div>

@endsection