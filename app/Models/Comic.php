<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Comic extends Model
{
    const IMAGE_KEY = 'small_url';

    public $primaryKey = 'cvid';
    public $incrementing = false;
    protected $fillable = [
        'name',
        'description',
        'start_year',
        'url',
        'cvid',
    ];

    protected $casts = [
        'cvid' => 'integer',
        'start_year' => 'integer',
        'downloadedIssuesCount' => 'integer',
    ];

    public function issues()
    {
        return $this->hasMany('App\Models\Issue', 'comic_id', 'cvid')->orderBy('issue_num', 'DESC');
    }

    public function issueFiles()
    {
        return $this->hasMany('App\Models\IssueFile', 'comic_id', 'cvid');
    }

    public function getDownloadedIssuesCountAttribute()
    {
        return $this->issues()->where('status', 'downloaded')->count();
    }

    public function getImageAttribute()
    {
        return asset('/storage/covers/' . $this->cvid . '.jpg');
    }

    public function getDirectoryNameAttribute()
    {
        return sprintf("%s (%d)", $this->name, $this->start_year);
    }

    public function getFullDirectoryNameAttribute()
    {
        $baseDir = resolve('AppSettings')->get('general', 'destination_dir');

        return $baseDir . DIRECTORY_SEPARATOR . $this->folderName;
    }

    public static function createFromCvid($cvid, $grabImage = true, $searchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
        $volume = $repo->volume($cvid);
        $volume['start_year'] = $volume['startYear'];

        $comic = Comic::create($volume);

        if ($grabImage) {
            $imagePath = $volume['image'];
            $comic->downloadImage($imagePath);
        }

        if ($searchIssues) {
            //TODO: Add job to search issues
        }

        return $comic;
    }

    public function updateFromCvid($grabImage = true, $fetchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
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

    protected function downloadImage($path)
    {
        //TODO: Replace with Guzzle
        $contents = file_get_contents($path);
        Storage::disk('covers')->put($this->cvid . '.jpg', $contents);
    }

    protected function fetchIssues()
    {
        $repo = resolve('ComicVineRepository');
        $issues = $repo->volumeIssues($this->cvid);

        foreach ($issues as $issue) {
            Issue::create($issue);
        }
    }

    protected static function booted()
    {
        static::created(function ($comic) {
            $comic->fetchIssues();
        });
    }
}
