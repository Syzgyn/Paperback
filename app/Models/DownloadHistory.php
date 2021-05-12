<?php

namespace App\Models;

use App\Libraries\Parser\ReleaseInfo;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DownloadHistory
 *
 * @property int $id
 * @property int $comic_id
 * @property int $issue_id
 * @property int $event_type
 * @property string $source_title
 * @property string $date
 * @property int $protocol
 * @property int $indexer_id
 * @property int $download_client_id
 * @property string|null $release
 * @property string|null $data
 * @property string|null $download_id
 * @property-read \App\Models\Comic $comic
 * @property-read \App\Models\Issue $issue
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory create()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereDownloadClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereDownloadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereIndexerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereProtocol($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadHistory whereSourceTitle($value)
 * @mixin \Eloquent
 */
class DownloadHistory extends Model
{
    public $timestamps = false;
    protected $table = "download_history";
    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
        'release' => ReleaseInfo::class,
        'data' => 'array',
        
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function issue()
    {
        return $this->belongsTo('App\Models\Issue', 'issue_id', 'cvid');
    }
    
    public static function findByDownloadId(string $downloadId): Collection
    {
        return self::whereDownloadId($downloadId)->orderByDesc('date')->get();
    }
    
    public static function deleteByComicId(int $comicId): void
    {
        self::whereComicId($comicId)->delete();
    }
}
