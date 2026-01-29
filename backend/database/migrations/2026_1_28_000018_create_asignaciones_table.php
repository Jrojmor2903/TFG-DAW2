<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('asignaciones', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_rol');

            // Claves foráneas
            $table->foreign('id_user')
                ->references('id')->on('users');

            $table->foreign('id_rol')
                ->references('id')->on('roles');

            // Evita duplicados (un usuario no puede tener el mismo rol dos veces)
            $table->unique(['id_user', 'id_rol']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('asignaciones');
    }
};
