<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\FieldDevice;
use App\Models\Fieldset;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fieldsets = Fieldset::orderBy('name')->get();
        $fields = FieldDevice::orderBy('name')->get();

        return Inertia::render('Auth/Field/Index',[
            'fieldsets' => $fieldsets,
            'fields' => $fields,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Field/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:field_devices,name'
        ]);

        $fieldDevice = FieldDevice::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Field Device',
            'data_id' => $fieldDevice->id,
            'data_type' => FieldDevice::class,
        ]);

        return redirect()->route('auth.field.index')->with([
            'message' => 'Successfully Created',
            'type' => 'success',
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
    public function edit(FieldDevice $field)
    {
        return Inertia::render('Auth/Field/Edit',[
            'field' => $field
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FieldDevice $field)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:field_devices,name,'.$field->id,
        ]);

        $field->update($data);
        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Field Device',
            'data_id' => $field->id,
            'data_type' => FieldDevice::class,
        ]);

        return redirect()->route('auth.field.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
