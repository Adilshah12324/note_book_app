<?php

namespace App\Models;

use App\Relationships\HasManySections;
use Illuminate\Database\Eloquent\Model;
use App\Relationships\BelongsToManyUsers;

class Book extends Model
{
    use BelongsToManyUsers, HasManySections;
    protected $table = 'books';

    protected $fillable = [
        'title',
        'release_date',
    ];
}
