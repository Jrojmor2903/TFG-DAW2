<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perfiles', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('id_usuario')->unique();

            $table->string('idioma')->default('es');
            $table->string('tema_visual')->default('default');
            $table->boolean('sonido')->default(true);
            $table->string('dificultad')->default('normal');

            $table->timestamps();

            $table->foreign('id_usuario')
                ->references('id')
                ->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perfiles');
    }
};
