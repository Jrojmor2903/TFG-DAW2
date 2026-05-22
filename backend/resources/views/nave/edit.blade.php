@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Nave</h1>

@if ($errors->any())
    <div style="color:red">
        @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('nave.update', $nave->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text"
                    name="nombre"
                    class="form-control"
                    value="{{ old('nombre', $nave->nombre) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Vida</label>
                <input type="text"
                    name="vida"
                    class="form-control"
                    value="{{ old('vida', $nave->vida) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Daño</label>
                <input type="text"
                    name="poder_disparo"
                    class="form-control"
                    value="{{ old('poder_disparo', $nave->poder_disparo) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Cadencia</label>
                <input type="text"
                    name="cadencia"
                    class="form-control"
                    value="{{ old('cadencia', $nave->cadencia) }}"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label">Precio</label>
                <input type="text"
                    name="precio"
                    class="form-control"
                    value="{{ old('precio', $nave->precio) }}"
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

            <div class="d-flex justify-content-between">
                <a href="{{ route('nave.index') }}" class="btn btn-secondary btn-sm">
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