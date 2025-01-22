<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class expenses extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'amount',
        'categoryid',
        'userid',
        'description',
        'date_spent',
        'periodic',
        'period_in_days'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class, foreignKey: 'userid', ownerKey: 'id');
    }

    public function categories(): BelongsTo
    {
        return $this->belongsTo(related: categories::class, foreignKey:'categoryid', ownerKey:'id');
    }
}
