<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    /**
     * Get all of the departments for the Company
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }
}
