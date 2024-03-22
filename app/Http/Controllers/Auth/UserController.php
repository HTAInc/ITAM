<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Department;
use App\Models\Section;
use App\Models\User;
use App\Notifications\User\CreateUserNotification;
use App\Notifications\User\EditUserNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['section','section.department','section.department.company','roles'])->get();
        return Inertia::render('Auth/User/Index',[
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();
        $sections = Section::orderBy('name')->get();
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Auth/User/Create',[
            'companies' => $companies,
            'departments' => $departments,
            'sections' => $sections,
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'department_id' => 'required|integer|exists:departments,id',
            'section_id' => 'required|integer|exists:sections,id',
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string|exists:roles,name',
            'credential' => 'nullable|boolean',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create($data);
        $role = $data['role'];
        $password = $data['password'];
        $user->assignRole($role);
        
        if($data['credential']){
            $user->notify(new CreateUserNotification($user, $password, $role));
        }

        return redirect()->route('auth.user.index')->with([
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
    public function edit(User $user)
    {
        $user->load(['section','section.department','section.department.company','roles']);
        $companies = Company::orderBy('name')->get();
        $departments = Department::orderBy('name')->get();
        $sections = Section::orderBy('name')->get();
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Auth/User/Edit',[
            'user' => $user,
            'companies' => $companies,
            'departments' => $departments,
            'sections' => $sections,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'department_id' => 'required|integer|exists:departments,id',
            'section_id' => 'required|integer|exists:sections,id',
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role' => 'required|string|exists:roles,name',
            'credential' => 'nullable|boolean',
            'password' => ['nullable','confirmed', Password::defaults()],
        ]);

        $password = $data['password'];
        if($password){
            $data['password'] = bcrypt($password);
        }else{
            $data['password'] = $user->password;
        }

        $user->update($data);
        $role = $data['role'];
        $newRole = Role::where('name', $role)->first();
        if ($newRole) {
            $user->syncRoles([$newRole]);
        }       

        if($password){
            $newPassword = $password;
        }else{
            $newPassword = 'Not changed';
        }

        if($data['credential']){
            $user->notify(new EditUserNotification($user, $newPassword, $role));
        }

        return redirect()->route('auth.user.index')->with([
            'message' => 'Successfully Updated',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('auth.user.index')->with([
            'message' => 'Successfully Deleted',
            'type' => 'success',
        ]);
    }
}
