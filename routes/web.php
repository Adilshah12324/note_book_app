<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    // Boon Routes
    Route::get('/dashboard',[BookController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/book/create', [BookController::class, 'create'])->name('books.create');
    Route::post('/dashboard/book/store', [BookController::class, 'store'])->name('books.store');
    Route::get('/dashboard/book/{bookId}', [BookController::class, 'show'])->name('books.show');
    
    // Section Routes
    Route::get('/dashboard/section/create/{bookId}', [SectionController::class, 'create'])->name('sections.create');
    Route::post('/dashboard/section/store', [SectionController::class, 'store'])->name('sections.store');
    Route::get('/dashboard/section/{sectionId}', [SectionController::class, 'show'])->name('sections.show');
    Route::get('/dashboard/sections/{section}/edit', [SectionController::class, 'edit'])->name('sections.edit');
    Route::put('/dashboard/sections/{section}', [SectionController::class, 'update'])->name('sections.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
