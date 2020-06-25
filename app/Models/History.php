<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $table = 'history';

    protected $fillable = [
        'comic_id',
        'issue_id',
        'date',
        'file_name',
        'download_id',
        'event_type',
    ];
}
