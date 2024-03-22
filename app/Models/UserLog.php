<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class UserLog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'activity_type',
        'description',
        'ip_address',
        'user_agent',
        'location',
        'data_id',
        'data_type',
        'user_id',
    ];

    /**
     * Get the user that owns the UserLog
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

     // Mutator untuk mendapatkan alamat IP yang sebenarnya
     public function setIpAddressAttribute($value)
     {
         $this->attributes['ip_address'] = $value ?: Request::ip();
     }
 
     // Mutator untuk mendapatkan userAgent
     public function setUserAgentAttribute($value)
     {
         $this->attributes['user_agent'] = $value ?: Request::header('User-Agent');
     }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($userLog) {
            $userLog->user_id = Auth::id();
            $userLog->ip_address  = request()->ip();
            $userLog->user_agent  = request()->header('User-Agent');
        });
    }
}
