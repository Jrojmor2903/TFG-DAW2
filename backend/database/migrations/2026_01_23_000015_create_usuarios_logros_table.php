<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('usuarios_logros', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_logro');
            $table->timestamp('fecha_obtenido')->useCurrent();

            $table->primary(['id_usuario', 'id_logro']);

            $table->foreign('id_usuario')
                  ->references('id')
                  ->on('users');

            $table->foreign('id_logro')
                  ->references('id_logro')
                  ->on('logros');
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuarios_logros');
    }
};
