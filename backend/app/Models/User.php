<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Rol;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;




    /**
     * @return BelongsToMany<Rol>
     */
    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'asignaciones', 'id_user', 'id_rol');
    }
    public function rankings()
    {
        return $this->hasMany(Ranking::class, 'id_usuario');
    }
    public function logros()
    {
        return $this->belongsToMany(Logro::class, 'progresos');
    }

    public function navesDesbloqueadas()
    {
        return $this->belongsToMany(
            Nave::class, // modelo relacionado
            'flotas',    // tabla pivote
            'user_id',   // FK de este modelo en pivote
            'nave_id'    // FK del modelo relacionado en pivote
        );
    }

    public function perfil()
    {
        return $this->hasOne(Perfil::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn($value) => $value ? bcrypt($value) : null,
        );
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
