<?php

namespace App\Models;

use App\Relationships\BelongsToBook;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use BelongsToBook;
    protected $table = 'sections';

    protected $fillable = [
        'title',
        'parent_id',
    ];
}
