<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloaderFile extends Model
{
    use MoveAttributes;

    const STATUS_TEXT = [
        0 => 'Sending to Client',
        1 => 'Downloading',
        2 => 'Processing',
        3 => 'Completed',
    ];

    protected $table = 'issue_downloads';

    protected $fillable = [
        'comic_id',
        'issue_id',
        'download_id',
        'download_client_id',
        'url',
    ];

    protected $casts = [
        'comic_id' => 'integer',
        'issue_id' => 'integer',
        'download_client_id' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($issueDownload) {
            $issueDownload->data = ['status' => 0];
        });

        static::created(function ($issueDownload) {
            $issueDownload->startDownload();
        });
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

    /*
        public function getStatusAttribute()
        {
            if (!isset($this->data['status']))
            {
                return false;
            }

            return $this->data['status'];
        }

        public function getPercentCompleteAttribute()
        {
            if (!isset($this->data['percentComplete']))
            {
                return false;
            }

            return $this->data['percentComplete'];
        }

        public function getTimeLeftAttribute()
        {
            if (!isset($this->data['timeLeft']))
            {
                return false;
            }

            return $this->data['timeLeft'];
        }
        */

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
                    'status' => 1,
                ];

                $this->fill($params);
                $this->save();
                //$this->updateFromClient();
            } catch (\Exception $e) {
            }
            break;
        }
    }
}
