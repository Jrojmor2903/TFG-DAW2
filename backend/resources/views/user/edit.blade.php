@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Usuario</h1>

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('user.update', $user->id) }}" method="POST">
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
                <label class="form-label">Avatar URL</label>
                <input type="url"
                    name="avatar_url"
                    class="form-control"
                    value="{{ old('avatar_url') }}"
                    required>
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