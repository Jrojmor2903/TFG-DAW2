@extends('layouts.admin')

@section('content')

<h1 class="mb-4">➕ Crear Ranking</h1>

<div class="card shadow-sm">
    <div class="card-body">

@if ($errors->any())
    <div style="color:red">
        @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif
    
        <form action="{{ route('ranking.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">Usuarios</label>
                <select name="id_usuario" class="form-select" required>
                    @foreach($users as $user)
                    <option value="{{ $user->id }}">
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
                    value="{{ old('puntuacion') }}"
                    required>
            </div>

            <div class="mb-3">
                <label for="fecha">Fecha</label>
                <input type="date" name="fecha_partida" id="fecha" class="form-control" placeholder="YYYY-MM-DD">
            </div>



            <div class="d-flex justify-content-between">
                <a href="{{ route('ranking.index') }}" class="btn btn-secondary btn-sm">
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