<?php

namespace App\Models;

use App\Events\DownloadStarted;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;

class TrackedDownload extends Model
{
    const STATUS_TEXT = [
        0 => 'Sending to Client',
        1 => 'Downloading',
        2 => 'Processing',
        3 => 'Completed',
    ];

    protected $table = 'tracked_downloads';
    public $timestamps = false;

    protected $fillable = [
        'comic_id',
        'issue_id',
        'download_id',
        'download_client_id',
        'url',
        'source_title',
    ];

    protected $append = [
        'source_title',
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

    public static function createFromGuid(array $attrs)
    {
        $data = Cache::get(Indexer::CACHE_PREFIX . '.' . $attrs['guid']);

        if ($data) {
            return self::create($data);
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
                event(new DownloadStarted($this));
                //$this->updateFromClient();
                return true;
            } catch (\Exception $e) {
                //TODO: Error handling
            }
        }

        return false;
    }
}
