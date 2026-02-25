@extends('layouts.admin')

@section('content')
<h1 class="mb-4">Imágenes subidas</h1>

<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" />

<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
    
    @foreach($imagenes as $img)

        @php
            $path = 'uploads/' . basename($img['url']);

            $size = null;
            $modified = null;

            if (Storage::disk('s3')->exists($path)) {
                $size = number_format(
                    Storage::disk('s3')->size($path) / 1024,
                    2
                );

                $modified = \Carbon\Carbon::createFromTimestamp(
                    Storage::disk('s3')->lastModified($path)
                )->format('d/m/Y H:i');
            }
        @endphp

        <div class="relative group">

            <!-- Imagen -->
            <a data-fancybox="gallery"
               href="{{ $img['url'] }}"
               data-caption="
                    <strong>Nombre:</strong> {{ basename($img['url']) }}<br>

                    @if($size)
                        <strong>Tamaño:</strong> {{ $size }} KB<br>
                        <strong>Fecha:</strong> {{ $modified }}
                    @else
                        <em>Imagen externa</em>
                    @endif
               "
            >
                <img src="{{ $img['url'] }}"
                     class="w-full h-auto object-cover rounded">
            </a>
    <br><br>
            <!-- Botón borrar -->
            <form action="{{ route('imagen.delete') }}"
                  method="POST"
                  class="absolute top-1 right-1">
                @csrf
                @method('DELETE')

                <input type="hidden" name="model" value="{{ $img['model'] }}">
                <input type="hidden" name="id" value="{{ $img['id'] }}">
                <input type="hidden" name="field" value="{{ $img['field'] }}">

                <button type="submit"
                        class="btn btn-sm btn-danger">
                    Eliminar Imagen
                </button>
            </form>

        </div>
    <br><br>
    @endforeach

</div>

@endsection