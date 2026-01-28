<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('id_rol');

            // Claves foráneas
            $table->foreign('user_id')
                ->references('id')->on('users');

            $table->foreign('id_rol')
                ->references('id_rol')->on('roles');

            // Evita duplicados (un usuario no puede tener el mismo rol dos veces)
            $table->unique(['user_id', 'id_rol']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_roles');
    }
};
