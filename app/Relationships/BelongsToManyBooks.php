<?php

namespace App\Relationships;

use App\Models\Book;

trait BelongsToManyBooks
{
    public function books()
    {
        return $this->belongsToMany(Book::class);
    }
}
