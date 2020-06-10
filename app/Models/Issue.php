<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
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

    public function comic() {
        return $this->belongsTo('App\Comic', 'cvid', 'comic_id');
    }

    public function getReleaseDateAttribute() {
        return date('M j Y', strtotime($this->attributes['release_date']));
    }

    public function getDisplayNameAttribute() {
        if (isset($this->attributes['name'])) {
            return $this->attributes['name'];
        }

        return "Issue #" . $this->attributes['issue_num'];
    }

    public static function createFromCvid() {
        $repo = resolve("ComicVineRepository");
        $issue = $repo->issue($cvid);

        $issue = Issue::create($volume);

        return $issue;
    }

    public function updateFromCvid() {
        $repo = resolve("ComicVineRepository");
        $issue = $repo->issue($cvid);

        $issue->fill($volume);

        return $issue;
    }
}
