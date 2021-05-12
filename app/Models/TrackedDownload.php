<?php

namespace App\Models;

use App\Events\DownloadStarted;
use Illuminate\Database\Eloquent\Model;
use App\Models\Downloaders\DirectDownload;

/**
 * App\Models\TrackedDownload
 *
 * @property-read \App\Models\Comic $comic
 * @property-read \App\Models\Downloader $downloadClient
 * @property-read mixed $download_data
 * @property-read \App\Models\Issue $issue
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload query()
 * @mixin \Eloquent
 */
class TrackedDownload extends Model
{
    const DOWNLOAD_STATUS = [
        'Pending' => 0,
        'Downloading' => 1,
        'Completed' => 2,
        'Failed' => 3,
    ];

    protected $table = 'tracked_downloads';
    public $timestamps = false;
    public $url;
    public $indexerId;
    public $ddlFilename;

    protected $downloadStarted = false;

    protected $pulledDownloadData;

    protected $fillable = [
        'comic_id',
        'issue_id',
        'download_id',
        'download_client_id',
        'guid',
        'protocol',
    ];

    protected $casts = [
        'comic_id' => 'integer',
        'issue_id' => 'integer',
        'download_client_id' => 'integer',
        'status' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($trackedDownload) {
            $trackedDownload->date = now();
            $trackedDownload->status = static::DOWNLOAD_STATUS['Pending'];
        });

        static::created(function ($trackedDownload) {
            $trackedDownload->startDownload();
        });
    }

    public function downloadClient()
    {
        if ($this->protocol == 'ddl') {
            return new DirectDownload($this);
        }

        return $this->belongsTo('App\Models\Downloader');
    }

    public function indexerClient()
    {
        if (isset($this->indexerId)) {
            return Indexer::find($this->indexerId);
        }

        return null;
    }

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function issue()
    {
        return $this->belongsTo('App\Models\Issue', 'issue_id', 'cvid');
    }

    public function getDownloadDataAttribute()
    {
        if (! isset($this->pulledDownloadData)) {
            $this->pulledDownloadData = $this->downloadClient->getDownload($this->download_id);
        }

        return $this->pulledDownloadData;
    }

    public function updateFromClient()
    {
        $status = $this->downloadData['status'];

        if (array_key_exists($status, self::DOWNLOAD_STATUS)) {
            $this->status = self::DOWNLOAD_STATUS[$status];
            $this->save();
        }
    }

    public function getCompletedFilePath()
    {
        if ($this->status !== self::DOWNLOAD_STATUS['Completed']) {
            return null;
        }

        return $this->downloadData['storage'];
    }

    public function startDownload()
    {
        if ($this->downloadStarted) {
            return;
        }

        $this->downloadStarted = true;

        if ($this->protocol === 'ddl') {
            return $this->startDirectDownload();
        }

        $downloaders = Downloader::where('enable', true)->get();
        foreach ($downloaders as $downloader) {
            if ($downloader::PROTOCOL != $this->protocol) {
                continue;
            }

            try {
                $download_id = $downloader->download($this->url);

                $params = [
                    'download_client_id' => $downloader->id,
                    'download_id' => $download_id,
                ];

                $this->status = static::DOWNLOAD_STATUS['Downloading'];
                $this->fill($params);
                $this->save();
            } catch (\Exception $e) {
                //TODO: Error handling
                continue;
            }
            event(new DownloadStarted($this));

            return true;
        }

        return false;
    }

    protected function startDirectDownload()
    {
        $indexer = $this->indexerClient();

        if (! $indexer) {
            return false;
        }
        $downloader = $indexer->getDownloader($this);
        $downloader->download();
        $this->status = static::DOWNLOAD_STATUS['Downloading'];
        $this->save();

        return true;
    }
}
