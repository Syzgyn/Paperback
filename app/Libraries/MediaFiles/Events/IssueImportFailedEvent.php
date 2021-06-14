<?php

namespace App\Libraries\MediaFiles\Events;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientItemClientInfo;
use App\Libraries\Parser\LocalIssue;
use Exception;

class IssueImportFailedEvent
{

    public ?DownloadClientItemClientInfo $downloadClientInfo = null;
    public ?string $downloadId = null;

    public function __construct(
        public Exception $exception,
        public LocalIssue $localIssue,
        public bool $newDownload,
        ?DownloadClientItem $downloadClientItem
    )
    {
        if ($downloadClientItem != null) {
            $this->downloadClientInfo = $downloadClientItem->downloadClientInfo;
            $this->downloadId = $downloadClientItem->downloadId;
        }
    }
}