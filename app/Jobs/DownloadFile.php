<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\Downloaders\DirectDownload;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class DownloadFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;
    protected $targetFile;
    protected $trackedDownload;
    protected $fileHandler;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->url = $data['url'];
        $this->targetFile = $data['file'];
        $this->trackedDownload = $data['trackedDownload']->withoutRelations();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        set_time_limit(0);

        $this->targetFile = $this->targetFile;
        $this->fileHandler = fopen($this->targetFile, 'w+');

        $ch = curl_init($this->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_NOPROGRESS, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept-encoding: gzip',
            'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
            'Referer: https://getcomics.info/',
        ]);
        curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, [$this, 'progressCallback']);
        curl_setopt($ch, CURLOPT_TIMEOUT, -1);
        curl_setopt($ch, CURLOPT_FILE, $this->fileHandler);
        curl_exec($ch);

        //TODO: Add error handling for curl

        chmod($this->targetFile, 0777);
        unlink($this->targetFile . DirectDownload::PROGRESS_EXTENSION);

        $url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        $extension = pathinfo($url, PATHINFO_EXTENSION);
        $fileInfo = pathinfo($this->targetFile);
        $newFilename = $fileInfo['dirname'] . DIRECTORY_SEPARATOR . $fileInfo['filename'] . '.' . $extension;
        rename($this->targetFile, $newFilename);

        curl_close($ch);

        $this->trackedDownload->ddlFilename = $newfilename;

        resolve('FileManager')->manageDirectDownload($this->trackedDownload);
    }

    protected function progressCallback($ch, $downloadSize, $downloadedSize, $uploadSize, $uploadedSize)
    {
        if ($downloadSize == 0) {
            $progress = 0;
        } else {
            $progress = round($downloadedSize / $downloadSize * 100);
        }

        file_put_contents($this->targetFile . DirectDownload::PROGRESS_EXTENSION, $progress);
    }
}
