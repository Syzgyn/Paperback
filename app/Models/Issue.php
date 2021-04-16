<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    const CV_URL_BASE = 'https://comicvine.gamespot.com/';

    public $primaryKey = 'cvid';
    public $incrementing = false;
    public $timestamps = false;

    protected $guarded = [

        'created_at',
    ];

    protected $attributes = [
        'issue_file' => null,
        'monitored' => true,
    ];

    protected $casts = [
        'issue_num' => 'integer',
        'cvid' => 'integer',
        'comic_id' => 'integer',
        'monitored' => 'boolean',
        'images' => 'array',
    ];

    protected $with = [
        'comic',
        'downloadedFile',
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function downloadedFile()
    {
        return $this->hasOne('App\Models\IssueFile', 'id', 'issue_file');
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
                TrackedDownload::DOWNLOAD_STATUS['Completed'],
            ])->get();
    }

    public function hasDownloadedFile()
    {
        return isset($this->downloadedFile);
    }

    public function getOverviewAttribute()
    {
        return preg_replace(
            '/href\=\"\//',
            'target="_blank" href="' . self::CV_URL_BASE,
            $this->attributes['overview']
        );
    }

    public function getFileNameAttribute()
    {
        return sprintf('%s %03d', $this->comic->name, $this->issue_num);
    }

    public function getStatusAttribute()
    {
        if ($this->downloadedFile) {
            return 'downloaded';
        }

        if (count($this->activeDownloads) > 0) {
            return 'downloading';
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
}
