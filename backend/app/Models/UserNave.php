<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserNave extends Pivot
{
    protected $table = 'user_naves';

    protected $fillable = [
        'user_id', 'nave_id', 'equipada'
    ];
}
