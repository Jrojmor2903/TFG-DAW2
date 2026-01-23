<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('enemigos', function (Blueprint $table) {
            $table->id('id_enemigo');
            $table->string('nombre');
            $table->integer('vida')->default(100);
            $table->integer('daño')->default(10);
            $table->integer('puntos')->default(0);

            $table->unsignedBigInteger('creado_por')->nullable();
            $table->foreign('creado_por')
                  ->references('id')
                  ->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('enemigos');
    }
};
