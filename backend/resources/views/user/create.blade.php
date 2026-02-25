@extends('layouts.admin')

@section('content')

<h1 class="mb-4">➕ Crear Usuario</h1>

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

        <form action="{{ route('user.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="name"
                    class="form-control"
                    value="{{ old('name') }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email"
                    name="email"
                    class="form-control"
                    value="{{ old('email') }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Avatar</label>
                <input type="file" name="avatar" class="form-control" accept="image/*">
            </div>

            <div class="mb-3">
                <label class="form-label">Nombre de imagen</label>
                <input type="text"
                    value=""
                    name="nombreImg"
                    class="form-control"
                    placeholder="Dejar vacío para que el nombre sea el del archivo">
            </div>

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password"
                    name="password"
                    class="form-control"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Confirmar contraseña</label>
                <input type="password"
                    name="password_confirmation"
                    class="form-control"
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
                <a href="{{ route('user.index') }}" class="btn btn-secondary btn-sm">
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