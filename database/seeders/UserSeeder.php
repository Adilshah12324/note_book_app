<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Author 1',
                'email' => 'author@email.com',
                'password' => Hash::make('password'),
                'role' => '1',
                'parent_id' => null,
            ],
            [
                'name' => 'Collaborator 1',
                'email' => 'collaborator@email.com',
                'password' => Hash::make('password'),
                'role' => '2',
                'parent_id' => '1',
            ]
        ]);
    }
}
