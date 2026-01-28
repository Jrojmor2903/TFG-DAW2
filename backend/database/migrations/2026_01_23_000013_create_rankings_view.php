<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE VIEW ranking_view AS
            SELECT
                id,
                id_usuario,
                fecha_partida,
                ROW_NUMBER() OVER (
                    ORDER BY puntuacion DESC, fecha_partida ASC
                ) AS posicion
            FROM rankings
        ");
    }
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS ranking_view");
    }
};
