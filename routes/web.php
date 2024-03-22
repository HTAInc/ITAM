<?php

use App\Http\Controllers\Auth\AccessoriesController;
use App\Http\Controllers\Auth\AssetController;
use App\Http\Controllers\Auth\CategoryController;
use App\Http\Controllers\Auth\CompanyController;
use App\Http\Controllers\Auth\ComponentController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Auth\DepartmentController;
use App\Http\Controllers\Auth\DepreciationController;
use App\Http\Controllers\Auth\DowntimeController;
use App\Http\Controllers\Auth\FieldController;
use App\Http\Controllers\Auth\FieldsetController;
use App\Http\Controllers\Auth\LicenseController;
use App\Http\Controllers\Auth\ManufactureController;
use App\Http\Controllers\Auth\ModelDeviceController;
use App\Http\Controllers\Auth\SectionController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('auth')->middleware('auth')->name('auth.')->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/assets', AssetController::class);
    Route::resource('/licenses', LicenseController::class);
    Route::resource('/accessories', AccessoriesController::class);
    Route::resource('/components', ComponentController::class);
    Route::resource('/downtime', DowntimeController::class);
    Route::resource('/user', UserController::class);
    Route::resource('/model-device', ModelDeviceController::class);
    Route::resource('/field', FieldController::class);
    Route::resource('/fieldset', FieldsetController::class);
    Route::resource('/category', CategoryController::class);
    Route::resource('/manufacture', ManufactureController::class);
    Route::resource('/company', CompanyController::class);
    Route::resource('/department', DepartmentController::class);
    Route::resource('/section', SectionController::class);
    Route::resource('/depreciation', DepreciationController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
