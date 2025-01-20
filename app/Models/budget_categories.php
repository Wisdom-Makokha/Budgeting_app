<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class budget_categories extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'amount',
        'budgetid',
        'categoryid',
        'userid'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class, foreignKey: 'userid', ownerKey: 'id');
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(related: budget::class, foreignKey: 'budgetid', ownerKey: 'id');
    }

    public function categories(): BelongsTo
    {
        return $this->belongsTo(related: categories::class, foreignKey:'categoryid', ownerKey:'id');
    }
}
