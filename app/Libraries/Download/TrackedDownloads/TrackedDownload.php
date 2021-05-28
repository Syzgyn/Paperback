<?php

namespace App\Libraries\Download\TrackedDownloads;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Download\DownloadProtocol;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Parser\Parser;
use App\Models\DownloadHistory;
use App\Models\Issue;
use Exception;
use App\Libraries\Download\History\DownloadHistoryEventType;

class TrackedDownload
{
    public ?int $downloadClient = null;
    public ?DownloadClientItem $downloadItem = null;
    public ?DownloadClientItem $importItem = null;
    /** @var TrackedDownloadState::* */
    public ?int $state = null;
    /** @var TrackedDownloadStatus::* */
    public ?int $status = null;
    public ?RemoteIssue $remoteIssue = null;
    /** @var TrackedDownloadStatusMessage[] */
    public array $statusMessages = [];
    /** @var DownloadProtocol::* */
    public ?int $protocol = null;
    public ?string $indexer = null;
    public ?bool $isTrackable = null;
}