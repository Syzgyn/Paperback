<?php

namespace App\Models;

use App\Traits\ChangeComicLinks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Comic extends Model
{
    use ChangeComicLinks;

    const IMAGE_KEY = 'small_url';
    const UPDATED_AT = null;

    public $primaryKey = 'cvid';
    public $incrementing = false;

    protected $guarded = [
        'created_at',
    ];

    protected $attributes = [
        'tags' => '[]',
    ];

    protected $casts = [
        'cvid' => 'integer',
        'year' => 'integer',
        'downloadedIssuesCount' => 'integer',
        'monitored' => 'boolean',
        'images' => 'array',
        'tags' => 'array',
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
        return $this->issueFiles()->count();
    }

    public function getImagesAttribute()
    {
        $images = json_decode($this->attributes['images'], true);
        foreach($images as $k => $v) {
            if ($v['coverType'] === 'poster') {
                $images[$k]['url'] = asset('/storage/comics/' . $this->cvid . '.jpg');
            }
        }
        return $images;
    }

    public function getDirectoryNameAttribute()
    {
        return sprintf('%s (%d)', $this->name, $this->start_year);
    }

    public function getFullDirectoryNameAttribute()
    {
        $baseDir = resolve('AppSettings')->get('general', 'destination_dir');

        return $baseDir . DIRECTORY_SEPARATOR . $this->directoryName;
    }

    public static function createFromCvid($cvid, $grabImage = true, $searchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
        $volume = $repo->volume($cvid);

        $comic = Comic::create($volume);
        resolve('FileManager')->getOrCreateComicDir($comic);

        if ($grabImage) {
            $imagePath = $volume['images'][self::IMAGE_KEY];
            $comic->downloadImage($imagePath);
        }

        if ($searchIssues) {
            //TODO: Add job to search issues
        }

        return $comic;
    }

    public function updateFromComicvine($grabImage = true, $fetchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
        $volume = $repo->volume($this->cvid);

        $this->fill($volume);

        if ($grabImage) {
            $imagePath = $volume->images->{self::IMAGE_KEY};
            $this->downloadImage($imagePath);
        }

        if ($fetchIssues) {
            $this->fetchIssues();
        }

        return $this;
    }

    protected function downloadImage($path)
    {
        //TODO: Replace with Guzzle
        $contents = file_get_contents($path);
        Storage::disk('comics')->put($this->cvid . '.jpg', $contents);
    }

    protected function fetchIssues()
    {
        $repo = resolve('ComicVineRepository');
        $issues = $repo->volumeIssues($this->cvid);

        foreach ($issues as $issue) {
            Issue::updateOrCreate(['cvid' => $issue['cvid']], $issue);
        }
    }

    protected static function booted()
    {
        static::created(function ($comic) {
            resolve('FileManager')->getOrCreateComicDir($comic);
            $comic->fetchIssues();
        });
    }

    public function getOverviewAttribute()
    {
        return $this->changeComicLinks($this->attributes['overview']);
    }

    public function importIssuesFromPath(string $path)
    {
        $fileManager = resolve('FileManager');
        $parser = resolve('ParserService');
        $files = $fileManager->getComicsInFolder($path);

        if ($this->fullDirectoryName == $path) {
            //Path matches where the comic wants to put the issues, no need to move anything
            //continue;
        }

        foreach ($files as $file) {
            $info = $parser->getIssueInfoFromFile($file);

            foreach ($this->issues as $issue) {
                if ($issue->hasDownloadedFile()) {
                    continue;
                }

                if ($issue->issue_num == $info['issueNum']) {
                    IssueFile::createAndMove([
                        'comic_id' => $this->cvid,
                        'issue_id' => $issue->cvid,
                        'original_file_path' => $file,
                    ]);
                    break;
                }
            }
        }
    }
}
