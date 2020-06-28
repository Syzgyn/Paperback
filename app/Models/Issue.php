<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    const CV_URL_BASE = 'https://comicvine.gamespot.com/';

    public $primaryKey = 'cvid';
    public $incrementing = false;
    protected $fillable = [
        'name',
        'comic_id',
        'issue_num',
        'description',
        'release_date',
        'url',
        'cvid',
    ];

    protected $hidden = [
        'name',
    ];

    protected $casts = [
        'issue_num' => 'integer',
        'cvid' => 'integer',
        'comic_id' => 'integer',
    ];

    protected $appends = [
        'display_name',
    ];

    protected $with = [
        'comic',
        'downloadedFile',
        'trackedDownloads',
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function downloadedFile()
    {
        return $this->hasOne('App\Models\IssueFile', 'issue_id', 'cvid');
    }

    public function trackedDownloads()
    {
        return $this->hasMany('App\Models\TrackedDownload', 'issue_id', 'cvid');
    }

    public function getActiveDownloadsAttribute()
    {
        return $this->trackedDownloads()
            ->whereIn('status', [
                TrackedDownload::DOWNLOAD_STATUS['Pending'],
                TrackedDownload::DOWNLOAD_STATUS['Downloading'],
            ])->get();
    }

    public function getReleaseDateAttribute()
    {
        return date('M j Y', strtotime($this->attributes['release_date']));
    }

    public function getDisplayNameAttribute()
    {
        if (isset($this->attributes['name'])) {
            return $this->attributes['name'];
        }

        return 'Issue #' . $this->attributes['issue_num'];
    }

    public function getDescriptionAttribute()
    {
        return preg_replace(
            '/href\=\"\//',
            'target="_blank" href="' . self::CV_URL_BASE,
            $this->attributes['description']
        );
    }

    public function getFileNameAttribute()
    {
        return sprintf('%s %03d', $this->comic->name, $this->issue_num);
    }

    public function getFullFileNameAttribute()
    {
        return $this->comic->fullDirectoryName . DIRECTORY_SEPARATOR . $this->fileName;
    }

    public function getStatusAttribute()
    {
        if ($this->downloadedFile) {
            return 'downloaded';
        }

        if (count($this->activeDownloads) > 0) {
            'downloading';
        }

        return 'missing';
    }

    public static function createFromCvid()
    {
        $repo = resolve('ComicVineRepository');
        $issue = $repo->issue($cvid);

        $issue = Issue::create($volume);

        return $issue;
    }

    public function updateFromCvid()
    {
        $repo = resolve('ComicVineRepository');
        $issue = $repo->issue($cvid);

        $issue->fill($volume);

        return $issue;
    }
}
