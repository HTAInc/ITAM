<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\FieldDevice;
use App\Models\Fieldset;
use App\Models\FieldsetDetail;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldsetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $fields = FieldDevice::orderBy('name')->get();
        return Inertia::render('Auth/Fieldset/Create',[
            'fields' => $fields
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:field_devices,name',
            'fields' => 'array|required'
        ]);

        $fieldset = Fieldset::create($data);
        foreach ($data['fields'] as $fieldId) {
            $fieldset->fields()->attach($fieldId);
        }
        

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Fieldset',
            'data_id' => $fieldset->id,
            'data_type' => Fieldset::class,
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
    public function edit(Fieldset $fieldset)
    {
        $fieldset->load('fields');
        $fields = FieldDevice::orderBy('name')->get();
        return Inertia::render('Auth/Fieldset/Edit',[
            'fieldset' => $fieldset,
            'fields' => $fields,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fieldset $fieldset)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:field_devices,name',
            'fields' => 'array|required'
        ]);

        $fieldset->update([
            'name' => $data['name']
        ]);

        $newFieldIds = $data['fields'];

        $currentFieldIds = $fieldset->fields->pluck('id')->toArray();
    
        // Tambahkan field baru tanpa melepaskan yang sudah ada
        $fieldset->fields()->syncWithoutDetaching($newFieldIds);
    
        // Hapus field-field yang tidak ada dalam array field baru
        $fieldsToDelete = array_diff($currentFieldIds, $newFieldIds);
        $fieldset->fields()->detach($fieldsToDelete);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Fieldset',
            'data_id' => $fieldset->id,
            'data_type' => Fieldset::class,
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
