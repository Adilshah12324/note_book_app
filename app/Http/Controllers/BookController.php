<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use App\Models\Section;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user->role == 2) {
            $books = Book::where('user_id', $user->parent_id)->get();
        } 
        else {
            $books = $user->books()->get();
        }

        return Inertia::render('Dashboard', [
            'books' => $books
        ]);
    }

    public function show($bookId)
    {
        $sections = Section::where('book_id', $bookId)
                            ->where('parent_id', null)
                            ->get();

        return Inertia::render('Sections/Index', [
            'book' => $sections,
            'bookId' => $bookId,
        ]);
    }

    public function create()
    {
        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'release_date' => 'nullable|date',
        ]);

        auth()->user()->books()->create([
            'title' => $request->title,
            'release_date' => $request->release_date,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Book created successfully.');
    }
}
