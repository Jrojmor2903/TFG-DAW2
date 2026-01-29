<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('niveles', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_nivel', 100)->unique();
            $table->string('dificultad');
            $table->string('fondo_url');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('niveles');
    }
};
