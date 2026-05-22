<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('escalados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_nivel');
            $table->unsignedBigInteger('id_enemigo');
            $table->integer('cantidad')->default(1);

            $table->unique(['id_nivel', 'id_enemigo']);

            $table->foreign('id_nivel')
                  ->references('id')
                  ->on('niveles');

            $table->foreign('id_enemigo')
                  ->references('id')
                  ->on('enemigos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('escalados');
    }
};
