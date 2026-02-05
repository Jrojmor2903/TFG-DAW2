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
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['avatar_url', 'nivel_actual', 'deleted_at']);
        });
    }
};
