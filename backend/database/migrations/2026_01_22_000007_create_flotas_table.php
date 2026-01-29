<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('flotas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users');

            $table->foreignId('nave_id')
                ->constrained('naves');

            $table->unique(['user_id', 'nave_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flotas');
    }
};
