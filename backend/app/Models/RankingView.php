<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RankingView extends Model
{
    protected $table = 'ranking_view';

        public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
