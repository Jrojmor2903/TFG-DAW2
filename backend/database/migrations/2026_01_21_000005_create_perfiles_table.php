<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perfiles', function (Blueprint $table) {
            $table->id('id_perfil');           // PK
            $table->unsignedBigInteger('id_usuario')->unique(); // 1:1
            $table->string('idioma')->default('es');
            $table->string('tema_visual')->default('claro');
            $table->boolean('sonido')->default(true);
            $table->string('dificultad')->default('normal');

            $table->timestamps();

            // FK relación 1:1 con usuarios
            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perfiles');
    }
};
