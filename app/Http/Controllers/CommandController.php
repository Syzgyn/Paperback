<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json();
    }

    public function get(int $id): JsonResponse
    {
        return response()->json();
    }

    public function start(Request $request)
    {

    }
    
    public function cancel(int $id)
    {

    }
}
