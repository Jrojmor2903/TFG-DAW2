<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
public function up()
{
    Schema::table('niveles', function (Blueprint $table) {
        $table->enum('tipo', ['historia', 'creado'])->default('historia');
        $table->unsignedBigInteger('id_creador')->nullable();
        $table->foreign('id_creador')->references('id')->on('users');
    });
}

    public function down()
    {
        Schema::table('niveles', function (Blueprint $table) {
            $table->dropColumn(['tipo']);
        });
    }
};
