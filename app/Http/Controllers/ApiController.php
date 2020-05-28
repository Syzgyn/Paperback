<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ComicVineRepository;
use App\Comic;

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
        $comics = $this->comicvine->volumes("transmetropolitan");

        return view('api', compact('comics'));
    }

    public function show($id)
    {
    }

    public function search($name) {
        return $this->comicvine->volumes($name);
    }

    public function addComic(int $cvid) {
        return Comic::createFromCvid($cvid);

    }
}
