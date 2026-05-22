<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nave extends Model
{
    use HasFactory;
    public $timestamps = false;
    
    protected $fillable = [
        'nombre',
        'vida',
        'poder_disparo',
        'cadencia',
        'precio',
        'avatar_url'
    ];

    public function usuarios()
    {
        return $this->belongsToMany(
            User::class,
            'flotas',
            'nave_id',
            'user_id'
        );
    }
}
