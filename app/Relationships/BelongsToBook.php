<?php

namespace App\Relationships;

use App\Models\Book;

trait BelongsToBook
{
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
