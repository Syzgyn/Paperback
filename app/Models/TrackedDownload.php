<?php

namespace App\Models;

use App\Events\DownloadStarted;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;

class TrackedDownload extends Model
{
    protected $table = 'tracked_downloads';
    public $timestamps = false;

    public $url = null;

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
    ];

    protected static function booted()
    {
        static::creating(function ($trackedDownload) {
            $trackedDownload->date = now();
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
        return $this->belongsTo('App\Models\Comic', 'cvid', 'comic_id');
    }

    public function issue()
    {
        return $this->belongsTo('App\Models\Issue', 'cvid', 'issue_id');
    }

    public function updateFromClient()
    {
        $client = $this->downloadClient;
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
