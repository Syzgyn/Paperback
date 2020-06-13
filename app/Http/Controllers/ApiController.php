<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use App\Repositories\ComicVineRepository;

class ApiController extends Controller
{
    protected $comicvine;

    public function __construct()
    {
        $this->comicvine = new ComicVineRepository();
    }

    public function index()
    {
        // Get all the post
        $comics = $this->comicvine->volumes('transmetropolitan');

        return view('api', compact('comics'));
    }

    public function show($id)
    {
    }

    public function search($name)
    {
        return $this->comicvine->volumes($name);
    }

    public function addComic(int $cvid)
    {
        return Comic::createFromCvid($cvid);
    }
}
