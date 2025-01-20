<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class categories extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'direction_of_flow',
        'description'
    ];

    public function budget_categories(): HasMany
    {
        return $this->hasMany(related: budget_categories::class, foreignKey: 'categoryid', localKey: 'id');
    }

    public function income(): HasMany
    {
        return $this->hasMany(income::class,'categoryid','id');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(expenses::class,'categoryid','id');
    }
}
