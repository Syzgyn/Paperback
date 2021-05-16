<?php

namespace App\Models;

use App\Traits\ChangeComicLinks;
use App\Models\Comic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Issue
 *
 * @property int $cvid
 * @property int $comic_id
 * @property int $issue_num
 * @property string|null $title
 * @property string|null $overview
 * @property int|null $issue_file
 * @property bool|null $monitored
 * @property string|null $store_date
 * @property string|null $cover_date
 * @property array|null $images
 * @property array $attributes
 * @property Comic $comic
 * @property-read mixed $active_downloads
 * @property-read mixed $file_name
 * @property-read mixed $has_file
 * @property-read mixed $status
 * @property-read \App\Models\IssueFile|null $issueFile
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TrackedDownload[] $trackedDownloads
 * @property-read int|null $tracked_downloads_count
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue query()
 * @method static \Illuminate\Database\Eloquent\Builder where($column, $value)
 * @method static \Illuminate\Database\Eloquent\Builder whereIn($column, $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCoverDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCvid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereIssueFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereIssueNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereMonitored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereOverview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereStoreDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue create($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue updateOrCreate($value, $params = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue|null firstWhere($column, $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue find($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue findMany($value)
 * @method static \Illuminate\Database\Eloquent\Builder join($model, $remote, $op, $local)
 * @mixin \Eloquent
 */
class Issue extends Model
{
    use ChangeComicLinks;

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
        'issue_file' => 'integer',
        'cvid' => 'integer',
        'comic_id' => 'integer',
        'monitored' => 'boolean',
        'images' => 'array',

    ];

    protected $with = [
        'comic',
        'issueFile',
    ];

    public function comic(): BelongsTo
    {
        return $this->belongsTo(Comic::class, 'comic_id', 'cvid');
    }

    public function issueFile(): HasOne
    {
        return $this->hasOne(IssueFile::class, 'id', 'issue_file');
    }

    /*
    public function trackedDownloads(): HasMany
    {
        return $this->hasMany(TrackedDownload::class, 'issue_id', 'cvid');
    }

    public function getActiveDownloadsAttribute(): Collection
    {
        return $this->trackedDownloads()
            ->whereIn('status', [
                TrackedDownload::DOWNLOAD_STATUS['Pending'],
                TrackedDownload::DOWNLOAD_STATUS['Downloading'],
                TrackedDownload::DOWNLOAD_STATUS['Completed'],
            ])->get();
    }
    */

    public function getHasFileAttribute(): bool
    {
        return $this->issue_file > 0;
    }

    public function getOverviewAttribute(): string
    {
        return $this->changeComicLinks((string) $this->attributes['overview']);
    }

    public function getFileNameAttribute(): string
    {
        /** @var Comic $comic */
        $comic = $this->comic;
        return sprintf('%s %03d', $comic->title, $this->issue_num);
    }

    public function getStatusAttribute(): string
    {
        if ($this->issueFile) {
            return 'downloaded';
        }
        
        /*
        if (count($this->activeDownloads) > 0) {
            return 'downloading';
        }
        */

        return 'missing';
    }
}
