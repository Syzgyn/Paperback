<?php
namespace App\Models\Downloaders\DDL;

use App\Jobs\DownloadMultipleImages;
use App\Models\Downloaders\DirectDownload;
use App\Repositories\Indexers\ComicExtraRepository;

class ComicExtra extends DirectDownload
{
    public function download()
    {
        $imageUrls = $this->getImageUrls();
        $filename = DownloadMultipleImages::dispatchNow([
            'imageUrls' => $imageUrls,
            'baseDir' => $this->getDirname(),
        ]);

        $this->trackedDownload->ddlFilename = $filename;

        resolve('FileManager')->manageDirectDownload($this->trackedDownload);
    }

    protected function getImageUrls()
    {
        $repo = new ComicExtraRepository();
        return $repo->getIssueImageUrls($this->trackedDownload->url);
    }

    public function getDirname()
    {
        $downloadDir = resolve('AppSettings')->get('general', 'download_dir');

        if (empty($downloadDir)) {
            $downloadDir = storage_path(self::DEFAULT_DOWNLOAD_PATH);
        }

        $finalDir = rtrim($downloadDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $this->trackedDownload->comic->name . ' - ' . sprintf("%03d", $this->trackedDownload->issue->issue_num);

        if (! file_exists($finalDir)) {
            mkdir($finalDir, 0777, true);
            chmod($finalDir, 0777);
        }

        return $finalDir;
    }

    public function getFilename()
    {
        return $this->getDirname() . '.cbz';
    }

    public function getProgress()
    {
        if (file_exists($this->getFilename())) {
            return 100;
        }

        return 0;
    }
}
