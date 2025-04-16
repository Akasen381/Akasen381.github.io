<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\LocationController;

Route::get('v1/locations-nearby', [LocationController::class, 'nearby']);
