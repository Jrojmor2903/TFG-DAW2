@extends('layouts.admin')

@section('content')

<h1 class="mb-4">➕  Subir Imagen</h1>


<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('imagen.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="mb-3">
                <label class="form-label">Imagen</label>
                <input type="file" name="imagen" class="form-control" accept="image/*">
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
                <a href="{{ route('imagen.index') }}" class="btn btn-secondary btn-sm">
                    Cancelar
                </a>
                <button type="submit" class="btn btn-success btn-sm">
                    Guardar Imagen
                </button>
            </div>

        </form>

    </div>

</div>

@endsection