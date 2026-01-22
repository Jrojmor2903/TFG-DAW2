<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nave extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre', 'vida', 'poder_disparo', 'cadencia', 'precio'
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'user_naves', 'nave_id', 'user_id')
            ->withPivot('equipada')
            ->withTimestamps();
    }
}
