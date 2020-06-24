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

    protected $appends = [
        'displayName',
    ];

    protected $casts = [
        'issue_num' => 'integer',
        'cvid' => 'integer',
        'comic_id' => 'integer',
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'cvid', 'comic_id');
    }

    public function downloadStatus()
    {
        return $this->hasMany('App\Models\IssueDownload', 'issue_id', 'cvid');
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
