<?php

namespace App\Libraries\Queue;

use App\Libraries\Download\DownloadProtocol;
use App\Libraries\Parser\RemoteIssue;
use App\Models\Comic;
use App\Models\Issue;
use DateTime;

class Queue
{
    public ?DateTime $estimatedCompletionTime = null;
    public ?int $id = null;

    public function __construct(
        public ?int $comicId = null,
        public ?int $issueId = null,
        public ?Comic $comic = null,
        public ?Issue $issue = null,
        public ?int $size = null,
        public ?string $title = null,
        public ?int $sizeLeft = null,
        public ?int $timeLeft = null,
        public ?string $status = null,
        public ?string $trackedDownloadStatus = null,
        public ?string $trackedDownloadState = null,
        public ?array $statusMessages = null,
        public ?string $errorMessage = null,
        public ?RemoteIssue $remoteIssue = null,
        public ?string $downloadId = null,
        public ?string $protocol = null,
        public ?string $downloadClient = null,
        public ?string $indexer = null,
        public ?string $outputPath = null,
    )
    {
    }
}