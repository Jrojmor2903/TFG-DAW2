<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Campos extra según tu diagrama
            $table->string('avatar_url')->nullable();
            $table->integer('nivel_actual')->default(1)->after('avatar_url');
            $table->unsignedBigInteger('id_rol')->after('nivel_actual');
            // FK relación con roles
            $table->foreign('id_rol')->references('id')->on('roles');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['id_rol']);
            $table->dropColumn(['nombre_usuario', 'fecha_registro', 'avatar_url', 'nivel_actual', 'id_rol']);
        });
    }
};
