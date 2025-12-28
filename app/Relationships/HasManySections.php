<?php

namespace App\Relationships;

use App\Models\Section;

trait HasManySections
{
    public function sections()
    {
        return $this->hasMany(Section::class);
    }
}
