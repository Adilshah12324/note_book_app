<?php

namespace App\Relationships;

use App\Models\User;

trait BelongsToManyUsers
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
