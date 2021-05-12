<?php

namespace App\Models;

use App\Traits\ChangeComicLinks;
use Illuminate\Database\Eloquent\Model;

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
 * @property-read \App\Models\Comic $comic
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
 * @method static \Illuminate\Database\Eloquent\Builder|Issue updateOrCreate($value)
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

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function issueFile()
    {
        return $this->hasOne('App\Models\IssueFile', 'id', 'issue_file');
    }

    public function trackedDownloads()
    {
        return $this->hasMany('App\Models\TrackedDownload', 'issue_id', 'cvid');
    }

    public function getActiveDownloadsAttribute()
    {
        return $this->trackedDownloads()
            ->whereIn('status', [
                TrackedDownload::DOWNLOAD_STATUS['Pending'],
                TrackedDownload::DOWNLOAD_STATUS['Downloading'],
                TrackedDownload::DOWNLOAD_STATUS['Completed'],
            ])->get();
    }

    public function getHasFileAttribute()
    {
        return $this->issue_file > 0;
    }

    public function getOverviewAttribute()
    {
        return $this->changeComicLinks($this->attributes['overview']);
    }

    public function getFileNameAttribute()
    {
        return sprintf('%s %03d', $this->comic->name, $this->issue_num);
    }

    public function getStatusAttribute()
    {
        if ($this->issueFile) {
            return 'downloaded';
        }

        if (count($this->activeDownloads) > 0) {
            return 'downloading';
        }

        return 'missing';
    }
}
