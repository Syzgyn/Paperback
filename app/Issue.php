<?php

namespace App;

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
}
