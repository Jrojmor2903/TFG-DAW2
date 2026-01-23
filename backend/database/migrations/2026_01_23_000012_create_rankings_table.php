<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rankings', function (Blueprint $table) {
            $table->id();
            $table->unsignedbigInteger('id_usuario');
            $table->bigInteger('puntuacion');
            $table->integer('posicion');
            $table->timestamp('fecha_partida')->nullable()->useCurrent();

            $table->foreign('id_usuario')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
