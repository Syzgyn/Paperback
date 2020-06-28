<?php

namespace App\Models;

use App\Events\DownloadStarted;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;

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

    public $url = null;
    protected $pulledDownloadData;

    protected $fillable = [
        'comic_id',
        'issue_id',
        'download_id',
        'download_client_id',
        'guid',
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

    public static function createFromGuid(string $guid)
    {
        $data = Cache::get(Indexer::CACHE_PREFIX . '.' . $guid);

        if ($data) {
            $model = new self();
            $model->fill($data);
            $model->url = $data['url'];
            $model->save();

            return $model;
        }

        return null;
    }

    public function downloadClient()
    {
        return $this->belongsTo('App\Models\Downloader');
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
        $downloaders = Downloader::where('enable', true)->get();
        foreach ($downloaders as $downloader) {
            try {
                $download_id = $downloader->download($this->url);

                $params = [
                    'download_client_id' => $downloader->id,
                    'download_id' => $download_id,
                ];

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
}
