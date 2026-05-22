@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Usuario</h1>

@if ($errors->any())
    <div style="color:red">
        @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('user.update', $user->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="name"
                    class="form-control"
                    value="{{ old('name', $user->name) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email"
                    name="email"
                    class="form-control"
                    value="{{ old('email', $user->email) }}"
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
                <label class="form-label">Nueva contraseña</label>
                <input type="password"
                    name="password"
                    class="form-control"
                    placeholder="Dejar vacío para no cambiar">
            </div>

            <div class="mb-3">
                <label class="form-label">Roles</label>
                <select name="rol[]" class="form-select" multiple required>
                    @foreach($roles as $rol)
                    <option value="{{ $rol->id }}"
                        {{ $user->roles->contains($rol->id) ? 'selected' : '' }}>
                        {{ $rol->nombre }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('user.index') }}" class="btn btn-secondary btn-sm">
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