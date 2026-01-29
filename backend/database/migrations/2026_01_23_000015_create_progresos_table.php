<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('progresos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_logro');
            $table->timestamp('fecha_obtenido')->useCurrent();

            $table->unique(['id_usuario', 'id_logro']);

            $table->foreign('id_usuario')
                  ->references('id')
                  ->on('users');

            $table->foreign('id_logro')
                  ->references('id')
                  ->on('logros');
        });
    }

    public function down()
    {
        Schema::dropIfExists('progresos');
    }
};
