<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $categories = Category::withCount('models')->orderBy('name')->get();

    return Inertia::render('Auth/Category/Index', [
        'categories' => $categories,
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'type' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = Storage::putFile('public/category', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }

        $category = Category::create($data);

        UserLog::create([
            'activity_type' => 'Created',
            'description' => 'Created category',
            'data_id' => $category->id,
            'data_type' => Category::class,
        ]);

        return redirect()->route('auth.category.index')->with([
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
    public function edit(Category $category)
    {
        return Inertia::render('Auth/Category/Edit',[
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
            'type' => 'required|string|max:255',
            'image' => ($request->input('image') == $category->image) ? 'nullable' : 'nullable|image|mimes:jpg,png,webp|max:2020',
        ]);

        if ($request->hasFile('image')) {
            if (!empty($category->image)) {
                $path = public_path($category->image);
                if(file_exists($path)){
                    unlink($path);
                }
            }
            $image = $request->file('image');
            $path = Storage::putFile('public/category', $image);
            $url = Storage::url($path);
            $data['image'] = $url;
        }else{
            $data['image'] = $category->image;
        }

        $category->update($data);

        UserLog::create([
            'activity_type' => 'Updated',
            'description' => 'Updated category',
            'data_id' => $category->id,
            'data_type' => Category::class,
        ]);
        return redirect()->route('auth.category.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (!empty($category->image)) {
            $path = public_path($category->image);
            if(file_exists($path)){
                unlink($path);
            }
        }

        $category->delete();
        UserLog::create([
            'activity_type' => 'Deleted',
            'description' => 'Deleted category',
            'data_id' => $category->id,
            'data_type' => Category::class,
        ]);

        return redirect()->route('auth.category.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success',
        ]);
    }
}
