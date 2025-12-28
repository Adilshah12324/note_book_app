<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function show($sectionId)
    {
        $ids = $this->getSubSections($sectionId);
        $subSections = Section::whereIn('id', $ids)->get();

        return Inertia::render('Sections/Show', [
            'subSections' => $subSections
        ]);
    }

    private function getSubSections($parentId, &$ids = [])
    {
        $children = Section::where('parent_id', $parentId)->get();
        foreach ($children as $child) {
            $ids[] = $child->id;
            $this->getSubSections($child->id, $ids);
        }

        return $ids;
    }

    public function create($bookId)
    {
        return Inertia::render('Sections/Create', [
            'bookId' => $bookId,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subsections.*.title' => 'nullable|string|max:255',
        ]);

        $section = Section::create([
            'title' => $request->title,
            'parent_id' => null,
            'book_id' => $request->book_id,
        ]);

        if ($request->subsections) {
            $parentId = $section->id;
            foreach ($request->subsections as $sub) {
                $subSection = Section::create([
                    'title' => $sub['title'],
                    'parent_id' => $parentId,
                    'book_id' => $request->book_id,
                ]);
                $parentId = $subSection->id;
            }
        }

        return redirect()->route('books.show', $request->book_id)
            ->with('success', 'Section created successfully.');
    }

    public function edit(Section $section)
    {
        $subSections = [];
        $current = $section;
        while ($current = Section::where('parent_id', $current->id)->first()) {
            $subSections[] = $current;
        }

        return Inertia::render('Sections/Edit', [
            'section' => $section,
            'subSections' => $subSections,
        ]);
    }

    public function update(Request $request, Section $section)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subsections.*.title' => 'nullable|string|max:255',
        ]);

        $section->update([
            'title' => $request->title,
        ]);

        $existingSubsections = Section::where('parent_id', $section->id)->get();
        foreach ($existingSubsections as $sub) {
            $sub->delete();
        }

        if ($request->subsections) {
            $parentId = $section->id;
            foreach ($request->subsections as $sub) {
                $subSection = Section::create([
                    'title' => $sub['title'],
                    'parent_id' => $parentId,
                    'book_id' => $section->book_id,
                ]);
                $parentId = $subSection->id;
            }
        }

        return redirect()->route('books.show', $section->book_id)
                        ->with('success', 'Section updated successfully.');
    }
}
