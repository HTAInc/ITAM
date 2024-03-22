<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Department;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments =Department::with('company')->orderBy('name')->get();
        return Inertia::render('Auth/Department/Index',[
            'departments' => $departments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get();
        return Inertia::render('Auth/Department/Create',[
            'companies' => $companies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'name' => 'required|string',
            'code' => 'required|string',
        ]);

        $department = Department::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Department',
            'data_id' => $department->id,
            'data_type' => Department::class,
        ]);
        return redirect()->route('auth.department.index')->with([
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
    public function edit(Department $department)
    {
        $department->load('company');
        $companies = Company::orderBy('name')->get();
        return Inertia::render('Auth/Department/Edit',[
            'department' => $department,
            'companies' => $companies,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $data = $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'name' => 'required|string',
            'code' => 'required|string',
        ]);

        $department->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Department',
            'data_id' => $department->id,
            'data_type' => Department::class,
        ]);

        return redirect()->route('auth.department.index')->with([
            'type' => 'success',
            'message' => 'Successfully Updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted Department',
            'data_id' => $department->id,
            'data_type' => Department::class,
        ]);

        return redirect()->route('auth.department.index')->with([
            'type' => 'success',
            'message' => 'Successfully Deleted'
        ]);
    }
}
