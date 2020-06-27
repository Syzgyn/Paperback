<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Dto\HistoryData;
use App\Traits\FillCastArray;

class History extends Model
{
    use FillCastArray;

    const EVENT_TYPES = [
        0 => 'Unknown',
        1 => 'DownloadStarted',
        2 => 'DownloadImported',
        3 => 'DownloadFailed',
    ];

    protected $table = 'history';
    public $timestamps = false;

    protected $fillable = [
        'comic_id',
        'issue_id',
        'date',
        'source_title',
        'download_id',
        'event_type',
        'data.download_client_id',
        'data.indexer',
        'data.indexer_id',
        'data.publish_date',
        'data.source',
        'data.download_url',
        'data.size',
        'data.guid',
    ];

    protected $casts = [
        'data' => HistoryData::class,
        'event_type' => 'integer',
        'comic_id' => 'integer',
        'issue_id' => 'integer',
        'date' => 'datetime',

    ];
}
