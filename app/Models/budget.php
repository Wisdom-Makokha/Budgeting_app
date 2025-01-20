<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class budget extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'userid',
        'amount',
        'start_date',
        'end_date'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class, foreignKey: 'userid', ownerKey: 'id');
    }

    public function budget_categories(): HasMany
    {
        return $this->hasMany(budget_categories::class, foreignKey:'budgetid', localKey:'id');
    }
}
