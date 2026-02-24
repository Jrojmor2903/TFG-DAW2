@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Permiso</h1>

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('permiso.update', $permiso->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="nombre"
                    class="form-control"
                    value="{{ old('nombre', $permiso->nombre) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Roles</label>
                <select name="rol[]" class="form-select" multiple required>
                    @foreach($roles as $rol)
                    <option value="{{ $rol->id }}"
                        {{ $permiso->roles->contains($rol->id) ? 'selected' : '' }}>
                        {{ $rol->nombre }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('permiso.index') }}" class="btn btn-secondary btn-sm">
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