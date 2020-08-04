<?php

namespace App\Models;

use App\Traits\TruncateHtml;
use App\Traits\ChangeComicLinks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Comic extends Model
{
    use TruncateHtml;
    use ChangeComicLinks;

    const IMAGE_KEY = 'small_url';
    const TRUNCATE_LENGTH = 600;

    public $primaryKey = 'cvid';
    public $incrementing = false;
    protected $fillable = [
        'name',
        'description',
        'start_year',
        'url',
        'cvid',
        'monitored',
    ];

    protected $casts = [
        'cvid' => 'integer',
        'start_year' => 'integer',
        'downloadedIssuesCount' => 'integer',
        'monitored' => 'boolean',
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

    public function getImageAttribute()
    {
        return asset('/storage/covers/' . $this->cvid . '.jpg');
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
        $volume['start_year'] = $volume['startYear'];

        $comic = Comic::create($volume);
        resolve('FileManager')->getOrCreateComicDir($comic);

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

        static::saving(function ($comic) {
            if ($comic->isDirty('monitored')) {
                //$comic->issues()->update(['monitored' => $comic->monitored]);
            }
        });
    }

    public function getDescriptionAttribute()
    {
        return $this->changeComicLinks($this->attributes['description']);
    }

    public function getTruncatedDescriptionAttribute()
    {
        return $this->truncateHtml($this->description, self::TRUNCATE_LENGTH, '...');
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
