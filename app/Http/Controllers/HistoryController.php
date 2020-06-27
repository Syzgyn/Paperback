<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use App\Http\Resources\HistoryCollection;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new HistoryCollection(History::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function issue(int $cvid)
    {
        $data = History::where('issue_id', $cvid)->orderBy('date', 'desc')->get();

        return new HistoryCollection($data);
    }
}
