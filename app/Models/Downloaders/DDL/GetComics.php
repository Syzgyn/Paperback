<?php
namespace App\Models\Downloaders\DDL;

use App\Jobs\DownloadFile;
use App\Models\Downloaders\DirectDownload;
use App\Repositories\Indexers\GetComicsRepository;

class GetComics extends DirectDownload
{
    public function download()
    {
        $url = $this->getFinalUrl($this->trackedDownload->url);
        $filename = DownloadFile::dispatchNow([
            'url' => $url,
            'file' => $this->getFilename(),
        ]);

        $this->trackedDownload->ddlFilename = $filename;

        resolve('FileManager')->manageDirectDownload($this->trackedDownload);
    }

    protected function getFinalUrl(string $url)
    {
        if (strpos($url, 'getcomics.info') !== false && strpos($url, 'run.php') === false && strpos($url, 'go.php') === false) {
            $repo = new GetComicsRepository();

            return $repo->getDownloadLinkFromPage($url);
        }

        return $url;
    }
}
