<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::orderBy('name')->get();
        return Inertia::render('Auth/Company/Index',[
            'companies' => $companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Company/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:companies'
        ]);

        $company = Company::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Company',
            'data_id' => $company->id,
            'data_type' => Company::class,
        ]);
        return redirect()->route('auth.company.index')->with([
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
    public function edit(Company $company)
    {
        return Inertia::render('Auth/Company/Edit',[
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:companies,name,'.$company->id
        ]);

        $company->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Company',
            'data_id' => $company->id,
            'data_type' => Company::class,
        ]);

        return redirect()->route('auth.company.index')->with([
            'type' => 'success',
            'message' => 'Successfully Updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted Company',
            'data_id' => $company->id,
            'data_type' => Company::class,
        ]);

        return redirect()->route('auth.company.index')->with([
            'type' => 'success',
            'message' => 'Successfully Deleted'
        ]);

    }
}
