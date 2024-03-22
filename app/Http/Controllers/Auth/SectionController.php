<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Department;
use App\Models\Section;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::with('department','department.company')->orderBy('name')->get();
        
        return Inertia::render('Auth/Section/Index',[
            'sections' => $sections
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();

        return Inertia::render('Auth/Section/Create',[
            'companies' => $companies,
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'department_id' => 'required|integer|exists:departments,id',
            'name' => 'required|string'
        ]);

        $section = Section::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Section',
            'data_id' => $section->id,
            'data_type' => Section::class,
        ]);

        return redirect()->route('auth.section.index')->with([
            'type' => 'success',
            'message' => 'Successfully Created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        $section->load('department.company');
        $companies = Company::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();

        return Inertia::render('Auth/Section/Edit',[
            'section' => $section,
            'companies' => $companies,
            'departments' => $departments
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'department_id' => 'required|integer|exists:departments,id',
            'company_id' => 'required|integer|exists:companies,id'
        ]);

        $section->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Section',
            'data_id' => $section->id,
            'data_type' => Section::class,
        ]);

        return redirect()->route('auth.section.index')->with([
            'type' => 'success',
            'message' => 'Successfully Updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();

        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted Section',
            'data_id' => $section->id,
            'data_type' => Section::class,
        ]);

        return redirect()->route('auth.section.index')->with([
            'type' => 'success',
            'message' => 'Successfully Deleted'
        ]);
    }
}
