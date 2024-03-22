<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ManufactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $manufacturers = Manufacturer::orderBy('name')->get();
        return Inertia::render('Auth/Manufacture/Index',[
            'manufacturers' => $manufacturers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Auth/Manufacture/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:manufacturers,name',
            'url' => 'nullable|url|unique:manufacturers,url',
            'support_url' => 'nullable|url|unique:manufacturers,support_url',
            'support_phone' => 'nullable|string|unique:manufacturers,support_phone',
            'support_email' => 'nullable|email|unique:manufacturers,support_email',
            'image' => 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = Storage::putFile('public/manufacture', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }

        $manufacture = Manufacturer::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created Manufacture',
            'data_id' => $manufacture->id,
            'data_type' => Manufacturer::class,
        ]);

        return redirect()->route('auth.manufacture.index')->with([
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
    public function edit(Manufacturer $manufacture)
    {
        return Inertia::render('Auth/Manufacture/Edit',[
            'manufacture' => $manufacture
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Manufacturer $manufacture)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$manufacture->id,
            'url' => 'nullable|url|unique:manufacturers,url,'.$manufacture->id,
            'support_url' => 'nullable|url|unique:manufacturers,support_url,'.$manufacture->id,
            'support_phone' => 'nullable|string|unique:manufacturers,support_phone,'.$manufacture->id,
            'support_email' => 'nullable|email|unique:manufacturers,support_email,'.$manufacture->id,
            'image' => ($request->input('image') == $manufacture->image) ? 'nullable' : 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);

        if ($request->hasFile('image')) {
            if (!empty($manufacture->image)) {
                $path = public_path($manufacture->image);
                if(file_exists($path)){
                    unlink($path);
                }
            }
            $image = $request->file('image');
            $path = Storage::putFile('public/manufacture', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }else{
            $data['image'] = $manufacture->image;
        }

        $manufacture->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated Manufacture',
            'data_id' => $manufacture->id,
            'data_type' => Manufacturer::class,
        ]);

        return redirect()->route('auth.manufacture.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacture)
    {
        if (!empty($manufacture->image)) {
            $path = public_path($manufacture->image);
            if(file_exists($path)){
                unlink($path);
            }
        }

        $manufacture->delete();
        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted Manufacture',
            'data_id' => $manufacture->id,
            'data_type' => Manufacturer::class,
        ]);

        return redirect()->route('auth.manufacture.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success',
        ]);
    }
}
