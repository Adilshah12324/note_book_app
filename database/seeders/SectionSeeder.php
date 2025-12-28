<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sections')->insert([
            [
                'book_id' => 1,
                'parent_id' => null,
                'title' => 'Section 1',
            ],
            [
                'book_id' => 1,
                'parent_id' => 1,
                'title' => 'Section 1 - subsection',
            ],
        ]);
    }
}
