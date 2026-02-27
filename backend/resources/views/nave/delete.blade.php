@extends('layouts.admin')

@section('content')

<h1 class="mb-4 text-danger">⚠ Confirmar eliminación</h1>

<div class="card shadow-sm border-danger">
    <div class="card-body">

    <p>
        ¿Estás seguro que deseas eliminar el usuario 
        <strong>{{ $usuario->name }}</strong>?
    </p>

    <form action="{{ route('user.destroy', $usuario->id) }}" method="POST">
        @csrf
        @method('DELETE')

        <div class="d-flex justify-content-between">
            <a href="{{ route('user.index') }}" class="btn btn-secondary btn-sm">
                Cancelar
            </a>
            <button type="submit" class="btn btn-danger btn-sm">
                Sí, eliminar
            </button>
        </div>
    </form>

</div>

</div>

@endsection
