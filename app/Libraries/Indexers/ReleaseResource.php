<?php

namespace App\Libraries\Indexers;

use DateTime;
use App\Libraries\DecisionEngine\DownloadDecision;

class ReleaseResource
{
    public string $guid;
    public int $age;
    public int $ageHours;
    public int $ageMinutes;
    public int $size;
    public int $indexerId;
    public string $indexer;
    public ?string $releaseGroup;
    public string $title;
    public bool $fullComic;
    public ?string $comicTitle;
    public array $issueNumbers = [];
    public bool $approved;
    public bool $temporarilyRejected;
    public bool $rejected;
    public array $rejections;
    public string $publishDate;
    public string $commentUrl;
    public string $downloadUrl;
    public string $infoUrl;
    public bool $issueRequested;
    public bool $downloadAllowed;
    public int $releaseWeight;

    public string $magnetUrl;
    public string $infoHash;
    public ?int $seeders;
    public ?int $leechers;
    public string $protocol;

    public static function fromDownloadDecision(DownloadDecision $decision)
    {
        $releaseInfo = $decision->remoteIssue->release;
        $parsedIssueInfo = $decision->remoteIssue->parsedIssueInfo;
        $remoteIssue = $decision->remoteIssue;

        $resource = new self();
        $resource->guid = $releaseInfo->guid;
        $resource->age = $releaseInfo->getAge();
        $resource->ageHours = $releaseInfo->getAgeHours();
        $resource->ageMinutes = $releaseInfo->getAgeMinutes();
        $resource->size = (int)$releaseInfo->size;
        $resource->indexerId = $releaseInfo->indexerId;
        $resource->indexer = $releaseInfo->indexer;
        $resource->releaseGroup = $parsedIssueInfo?->releaseGroup;
        $resource->title = $releaseInfo->title;
        $resource->fullComic = $parsedIssueInfo?->fullComic ?? false;
        $resource->comicTitle = $parsedIssueInfo?->comicTitle;
        $resource->issueNumbers = $parsedIssueInfo->issueNumbers;
        $resource->mappedIssueNumbers = array_map(fn($i) => $i->issue_num, $remoteIssue->issues);
        $resource->approved = $decision->isApproved();
        $resource->temporarilyRejected = $decision->isTemporarilyRejected();
        $resource->rejected = $decision->isRejected();
        $resource->rejections = array_map(fn($r) => (string)$r->reason, $decision->rejections);
        $resource->publishDate = $releaseInfo->publishDate->format('Y-m-d');
        $resource->commentUrl = $releaseInfo->commentUrl;
        $resource->downloadUrl = $releaseInfo->downloadUrl;
        $resource->infoUrl = $releaseInfo->infoUrl;
        $resource->issueRequested = $remoteIssue->issueRequested;
        $resource->downloadAllowed = $remoteIssue->downloadAllowed;

        $resource->protocol = $releaseInfo->downloadProtocol;

        return $resource;
    }
}
