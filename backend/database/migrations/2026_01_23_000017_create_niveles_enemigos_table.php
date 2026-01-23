<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('niveles_enemigos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_nivel');
            $table->unsignedBigInteger('id_enemigo');
            $table->integer('cantidad')->default(1);

            // PK compuesta
            $table->primary(['id_nivel', 'id_enemigo']);

            // Foreign keys
            $table->foreign('id_nivel')
                  ->references('id')
                  ->on('niveles');

            $table->foreign('id_enemigo')
                  ->references('id_enemigo')
                  ->on('enemigos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('niveles_enemigos');
    }
};
