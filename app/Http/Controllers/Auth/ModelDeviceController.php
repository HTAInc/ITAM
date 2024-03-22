<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Depreciation;
use App\Models\Fieldset;
use App\Models\Manufacturer;
use App\Models\ModelDevice;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModelDeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = ModelDevice::with('manufacturer','fieldset','category')->orderBy('name')->get();

        return Inertia::render('Auth/Model/Index',[
            'models' => $models,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        $manufacturers = Manufacturer::orderBy('name')->get();
        $depreciations = Depreciation::orderBy('name')->get();
        $fieldsets = Fieldset::orderBy('name')->get();
        return Inertia::render('Auth/Model/Create',[
            'categories' => $categories,
            'manufacturers' => $manufacturers,
            'depreciations' => $depreciations,
            'fieldsets' => $fieldsets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:model_devices,name',
            'category_id' => 'required|integer|exists:categories,id',
            'manufacturer_id' => 'required|integer|exists:manufacturers,id',
            'depreciation_id' => 'nullable|integer|exists:depreciations,id',
            'fieldset_id' => 'nullable|integer|exists:fieldsets,id',
            'model_no' => 'required|string|unique:model_devices,model_no',
            'min_qty' => 'nullable|integer',
            'note' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = Storage::putFile('public/asset', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }

        $model = ModelDevice::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created model asset',
            'data_id' => $model->id,
            'data_type' => ModelDevice::class,
        ]);

        return redirect()->route('auth.model-device.index')->with([
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
    public function edit(ModelDevice $modelDevice)
    {
        $categories = Category::orderBy('name')->get();
        $manufacturers = Manufacturer::orderBy('name')->get();
        $depreciations = Depreciation::orderBy('name')->get();
        $fieldsets = Fieldset::orderBy('name')->get();

        return Inertia::render('Auth/Model/Edit',[
            'modelDevice' => $modelDevice,
            'categories' => $categories,
            'manufacturers' => $manufacturers,
            'depreciations' => $depreciations,
            'fieldsets' => $fieldsets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ModelDevice $modelDevice)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:model_devices,name,'.$modelDevice->id,
            'category_id' => 'required|integer|exists:categories,id',
            'manufacturer_id' => 'required|integer|exists:manufacturers,id',
            'depreciation_id' => 'nullable|integer|exists:depreciations,id',
            'fieldset_id' => 'nullable|integer|exists:fieldsets,id',
            'model_no' => 'required|string|unique:model_devices,model_no,'.$modelDevice->id,
            'min_qty' => 'nullable|integer',
            'note' => 'nullable|string',
            'image' => ($request->input('image') == $modelDevice->image) ? 'nullable' : 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);

        if ($request->hasFile('image')) {
            if (!empty($modelDevice->image)) {
                $path = public_path($modelDevice->image);
                if(file_exists($path)){
                    unlink($path);
                }
            }
            $image = $request->file('image');
            $path = Storage::putFile('public/asset', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }else{
            $data['image'] = $modelDevice->image;
        }

        $modelDevice->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Model Asset',
            'data_id' => $modelDevice->id,
            'data_type' => ModelDevice::class,
        ]);
        return redirect()->route('auth.model-device.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ModelDevice $modelDevice)
    {
        if (!empty($modelDevice->image)) {
            $path = public_path($modelDevice->image);
            if(file_exists($path)){
                unlink($path);
            }
        }

        $modelDevice->delete();
        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted model Device',
            'data_id' => $modelDevice->id,
            'data_type' => Category::class,
        ]);

        return redirect()->route('auth.model-device.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success',
        ]);
    }
}
