<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Depreciation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'months',
    ];
}
