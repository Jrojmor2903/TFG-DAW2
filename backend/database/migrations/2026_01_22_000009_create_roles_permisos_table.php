<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles_permisos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_rol');
            $table->unsignedBigInteger('id_permiso');

            $table->foreign('id_rol')->references('id_rol')->on('roles');
            $table->foreign('id_permiso')->references('id_permiso')->on('permisos');

            $table->primary(['id_rol', 'id_permiso']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roles_permisos');
    }
};
