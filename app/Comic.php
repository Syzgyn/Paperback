<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Repositories\ComicVineRepository;
use App\Issue;

class Comic extends Model
{
    const IMAGE_KEY = "small_url";

    public $primaryKey = 'cvid';
    public $incrementing = false; 
    protected $fillable = [
        'name',
        'description',
        'start_year',
        'url',
        'cvid',
    ];

    public function issues() {
        return $this->hasMany('App\Issue');
    }

    public static function createFromCvid($cvid, $grabImage = true) {
        $repo = resolve("ComicVineRepository");
        $volume = $repo->volume($cvid);

        $comic = Comic::create($volume);

        if ($grabImage) {
            $imagePath = $volume->image;
            $comic->downloadImage($imagePath);
        }

        return $comic;
    }

    public updateFromCvid($grabImage = true, $fetchIssues = false) {
        $repo = resolve("ComicVineRepository");
        $volume = $repo->volume($cvid);

        $comic->fill($volume);

        if ($grabImage) {
            $imagePath = $volume->image;
            $comic->downloadImage($imagePath);
        }

        if ($fetchIssues) {
            $this->fetchIssues();
        }

        return $comic;
    }

    protected function downloadImage($path) {
        //TODO: Replace with Guzzle
        $contents = file_get_contents($path);
        Storage::disk('covers')->put($this->cvid . ".jpg", $contents);
    } 

    protected function fetchIssues() {
        $repo = resolve("ComicVineRepository");
        $issues = $repo->volumeIssues($this->cvid);

        foreach($issues as $issue) {
            Issue::create($issue);
        }

    }

    public function issues() {
        return $this->hasMany(\App\Issue::class);
    }

    protected static function booted() {
        static::created(function($comic) {
            $comic->fetchIssues();
        });
    }
}
