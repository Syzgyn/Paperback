<?php
namespace App\Models\Downloaders;

use App\Jobs\DownloadFile;
use App\Models\TrackedDownload;

class DirectDownload
{
    const PROGRESS_EXTENSION = '.progress';
    const DEFAULT_DOWNLOAD_PATH = 'app/downloads';

    protected TrackedDownload $trackedDownload;

    public function __construct(TrackedDownload $trackedDownload)
    {
        $this->trackedDownload = $trackedDownload;
    }

    public function test()
    {
        return ['result' => true];
    }

    public function download()
    {
        $filename = DownloadFile::dispatchNow([
            'url' => $this->trackedDownload->url,
            'file' => $this->getFilename(),
        ]);

        $this->trackedDownload->ddlFilename = $filename;

        resolve('FileManager')->manageDirectDownload($this->trackedDownload);
    }

    public function getDownload($id)
    {
        $progress = $this->getProgress();

        return [
            'storage' => $this->getFilename(),
            'status' => $progress == 100 ? TrackedDownload::DOWNLOAD_STATUS['Completed'] : TrackedDownload::DOWNLOAD_STATUS['Downloading'],
            'percentage' => $progress,
        ];
    }

    public function getFilename()
    {
        $downloadDir = resolve('AppSettings')->get('general', 'download_dir');

        if (empty($downloadDir)) {
            $downloadDir = storage_path(self::DEFAULT_DOWNLOAD_PATH);
        }

        if (! file_exists($downloadDir)) {
            mkdir($downloadDir, 0777, true);
            chmod($downloadDir, 0777);
        }

        return rtrim($downloadDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $this->trackedDownload->comic->name . '.' . $this->trackedDownload->guid . '.download';
    }

    public function getProgressFilename()
    {
        return $this->getFilename() . self::PROGRESS_EXTENSION;
    }

    protected function getProgress()
    {
        $progress = file_get_contents($this->getProgressFilename());

        if ($progress === false) {
            return 0;
        }

        return $progress;
    }
}
