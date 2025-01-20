<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transactions extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'type',
        'userid',
        'amount',
        'date',
        'description'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class, foreignKey: 'userid', ownerKey: 'id');
    }
}
