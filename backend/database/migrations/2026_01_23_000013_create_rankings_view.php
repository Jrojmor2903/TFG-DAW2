<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        DB::statement("
        CREATE OR REPLACE VIEW ranking_view AS
        SELECT
            r.id,
            r.id_usuario,
            u.name AS usuario_nombre,
            r.puntuacion,
            r.fecha_partida,
            ROW_NUMBER() OVER (
                ORDER BY r.puntuacion DESC, r.fecha_partida ASC
            ) AS posicion
        FROM rankings r
        JOIN users u ON r.id_usuario = u.id;
        ");
    }
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS ranking_view");
    }
};
