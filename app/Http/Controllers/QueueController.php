<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Http\Resources\IssueCollection;
use Illuminate\Http\Request;

class QueueController extends Controller
{
    public function details(Request $request)
    {
        //TODO
        //Params: issueIds, comicId
        return response()->json();
    }
}
