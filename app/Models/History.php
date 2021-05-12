<?php

namespace App\Models;

use App\Dto\HistoryData;
use App\Traits\FillCastArray;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\History
 *
 * @property int $id
 * @property int $comic_id
 * @property int $issue_id
 * @property string $source_title
 * @property \Illuminate\Support\Carbon $date
 * @property HistoryData $data
 * @property int|null $event_type
 * @property string|null $download_id
 * @method static \Illuminate\Database\Eloquent\Builder|History newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|History newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|History query()
 * @method static \Illuminate\Database\Eloquent\Builder|History whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereDownloadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereSourceTitle($value)
 * @mixin \Eloquent
 */
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
