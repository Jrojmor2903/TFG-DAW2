<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partidas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuario');
            $table->bigInteger('puntuacion');
            $table->time('duracion');
            $table->timestamp('fecha_partida')->nullable()->useCurrent();

            $table->foreign('id_usuario')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
