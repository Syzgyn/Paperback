<?php

namespace App\Libraries\MediaFiles\Events;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientItemClientInfo;
use App\Libraries\Parser\LocalIssue;
use App\Models\IssueFile;

class IssueImportedEvent
{
    public ?DownloadClientItemClientInfo $downloadClientInfo = null;
    public ?string $downloadId = null;

    public function __construct(
        public LocalIssue $localIssue,
        public IssueFile $issueFile,
        public array $oldFiles,
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