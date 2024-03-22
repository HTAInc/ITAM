<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Downtime extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category',
        'downtime',
        'uptime',
        'total',
        'issue',
        'remark',
        'availability',
        'user_id',
    ];
    
    /**
     * Get the user that owns the Downtime
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}