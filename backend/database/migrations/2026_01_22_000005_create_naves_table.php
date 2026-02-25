<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('naves', function (Blueprint $table) {
            $table->id();

            $table->string('nombre');
            $table->integer('vida');
            $table->integer('poder_disparo');
            $table->integer('cadencia');
            $table->integer('precio');
            $table->string('avatar_url');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('naves');
    }
};
