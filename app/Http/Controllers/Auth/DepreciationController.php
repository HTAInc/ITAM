<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Depreciation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepreciationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $depreciations = Depreciation::all();
        return Inertia::render('Auth/Depreciation/Index',[
            'depreciations' => $depreciations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('Auth/Depreciation/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:depreciations,name',
            'months' => 'required|integer',
        ]);

        Depreciation::create($data);
        return redirect()->route('auth.depreciation.index')->with([
            'message' => 'Successfully Created',
            'type' => 'success'
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
    public function edit(Depreciation $depreciation)
    {
        return Inertia::render('Auth/Depreciation/Edit',[
            'depreciation' => $depreciation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Depreciation $depreciation)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:depreciations,name,'.$depreciation->id,
            'months' => 'required|integer'
        ]);

        $depreciation->update($data);
        return redirect()->route('auth.depreciation.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Depreciation $depreciation)
    {
        $depreciation->delete();

        return redirect()->route('auth.depreciation.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success'
        ]);
    }
}
