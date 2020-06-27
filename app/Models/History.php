<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    const EVENT_TYPES = [
        0 => 'Unknown',
        1 => 'Grabbed',
        2 => 'DownloadImported',
        3 => 'DownloadFailed',
    ];

    protected $table = 'history';

    protected $fillable = [
        'comic_id',
        'issue_id',
        'date',
        'source_title',
        'download_id',
        'event_type',
    ];
}
