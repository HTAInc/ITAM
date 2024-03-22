<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelDevice extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'model_no',
        'min_qty',
        'category_id',
        'manufacturer_id',
        'depreciation_id',
        'fieldset_id',
        'image',
        'notes',
    ];

    /**
     * Get the category that owns the ModelDevice
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the manufacturer that owns the ModelDevice
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class);
    }

    /**
     * Get the fieldset that owns the ModelDevice
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fieldset(): BelongsTo
    {
        return $this->belongsTo(Fieldset::class);
    }
}
