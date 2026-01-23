<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('logros', function (Blueprint $table) {
            $table->id('id_logro');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->integer('puntos')->default(0);
            $table->string('url')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('logros');
    }
};
