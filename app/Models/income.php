<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class income extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'amount',
        'source',
        'date_received',
        'periodic',
        'period_in_days',
        'categoryid',
        'userid'
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
