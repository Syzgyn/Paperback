<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Downloaders\DirectDownload;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use wapmorgan\UnifiedArchive\UnifiedArchive;

class DownloadMultipleImages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $imageUrls;
    protected $baseDir;
    protected $downloadStarted = false;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->imageUrls = $data['imageUrls'];
        $this->baseDir = $data['baseDir'];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        set_time_limit(0);
        $client = new Client();
        $promises = [];

        foreach($this->imageUrls as $index => $url) {
            $promises[$index] = $client->getAsync($url, ['save_to' => $this->baseDir . DIRECTORY_SEPARATOR . sprintf("%03d", $index + 1)]);
        }

        Promise\settle($promises)->wait();

        $files = array_diff(scandir($this->baseDir), ['.', '..']);
        foreach($files as $file) {
            $fullPath = $this->baseDir . DIRECTORY_SEPARATOR . $file;
            switch(exif_imagetype($fullPath)) {
                case IMAGETYPE_GIF:
                    $ext = 'gif';
                    break;
                case IMAGETYPE_JPEG:
                    $ext = 'jpeg';
                    break;
                case IMAGETYPE_PNG:
                    $ext = 'png';
                    break;
                case IMAGETYPE_BMP:
                    $ext = 'bmp';
                    break;
            }

            if ($ext) {
                rename($fullPath, $fullPath . '.' . $ext);
            }
        }

        UnifiedArchive::archiveDirectory($this->baseDir, $this->baseDir . '.zip');
        rename($this->baseDir . '.zip', $this->baseDir . '.cbz');
        unlink($this->baseDir);

        return $this->baseDir . '.cbz';
    }
}
