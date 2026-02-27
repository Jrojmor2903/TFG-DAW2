@extends('layouts.admin')

@section('content')

<h1 class="mb-4">✏ Editar Ranking</h1>

@if ($errors->any())
<div style="color:red">
    @foreach ($errors->all() as $error)
    <p>{{ $error }}</p>
    @endforeach
</div>
@endif

<div class="card shadow-sm">
    <div class="card-body">

        <form action="{{ route('ranking.update', $ranking->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Usuarios</label>
                <select name="id_usuario" class="form-select" required>
                    @foreach($users as $user)
                    <option value="{{ $user->id }}"
                        {{ $ranking->user_id == $user->id ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Puntuacion</label>
                <input type="text"
                    name="puntuacion"
                    class="form-control"
                    value="{{ old('puntuacion' , $ranking->puntuacion) }}"
                    required>
            </div>

            <div class="mb-3">
                <label for="fecha">Fecha</label>
                <input
                    type="date"
                    name="fecha_partida"
                    id="fecha"
                    class="form-control"
                    value="{{ old('fecha_partida', substr($ranking->fecha_partida, 0, 10)) }}">
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('ranking.index') }}" class="btn btn-secondary btn-sm">
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