<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'image',
    ];

    /**
     * Get all of the models for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function models(): HasMany
    {
        return $this->hasMany(ModelDevice::class);
    }

    public function qty(): int
    {
        return $this->models()->count();
    }
}
