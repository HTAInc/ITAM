<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Downtime;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DowntimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $downtimes = Downtime::orderBy('downtime','desc')->get();
        
        return Inertia::render('Auth/Downtime/Index',[
            'downtimes' => $downtimes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Downtime/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string',
            'downtime' => 'required|date_format:Y-m-d\TH:i',
            'uptime' => 'required|date_format:Y-m-d\TH:i|after_or_equal:downtime',
            'issue' => 'required|string',
            'remark' => 'nullable|string',
        ]);

        $data['total'] = Carbon::parse($data['uptime'])->diffInMinutes(Carbon::parse($data['downtime']));    
        $data['availability'] = (1-($data['total'] / 43200)) * 100;
        $data['user_id'] = Auth::user()->id;
        Downtime::create($data);

        return redirect()->route('auth.downtime.index')->with([
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
    public function edit(Downtime $downtime)
    {
        return Inertia::render('Auth/Downtime/Edit',[
            'downtime' => $downtime
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Downtime $downtime)
    {
        $data = $request->validate([
            'category' => 'required|string',
            'downtime' => 'required|date_format:Y-m-d\TH:i',
            'uptime' => 'required|date_format:Y-m-d\TH:i|after_or_equal:downtime',
            'issue' => 'required|string',
            'remark' => 'nullable|string',
        ]);
        $data['user_id'] = Auth::user()->id;
        $downtime->update($data);

        return redirect()->route('auth.downtime.index')->with([
            'type' => 'success',
            'message' => 'Successfully Updated'
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Downtime $downtime)
    {
        $downtime->delete();
        return redirect()->route('auth.downtime.index')->with([
            'type' => 'success',
            'message' => 'Successfully Deleted'
        ]);
    }
}
