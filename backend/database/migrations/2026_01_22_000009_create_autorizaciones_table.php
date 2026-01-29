<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('autorizaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_rol');
            $table->unsignedBigInteger('id_permiso');

            $table->foreign('id_rol')->references('id')->on('roles');
            $table->foreign('id_permiso')->references('id')->on('permisos');

            $table->unique(['id_rol', 'id_permiso']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('autorizaciones');
    }
};
