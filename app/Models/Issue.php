<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    public $primaryKey = 'cvid';
    public $incrementing = false; 
    protected $fillable = [
        'comic_id',
        'issue_num',
        'description',
        'release_date',
        'url',
        'cvid',
    ];

    public function comic() {
        return $this->belongsTo('App\Comic');
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
