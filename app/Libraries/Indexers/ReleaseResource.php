<?php

namespace App\Libraries\Indexers;

use DateTime;
use App\Libraries\DecisionEngine\DownloadDecision;
use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Libraries\Parser\ReleaseInfo;
use App\Libraries\Parser\RemoteIssue;
use App\Models\Issue;
use Illuminate\Http\Request;

class ReleaseResource
{
    public ?string $guid = null;
    public ?int $age = null;
    public ?int $ageHours = null;
    public ?int $ageMinutes = null;
    public ?int $size = null;
    public ?int $indexerId = null;
    public ?string $indexer = null;
    public ?string $releaseGroup = null;
    public ?string $title = null;
    public ?bool $fullComic = null;
    public ?string $comicTitle = null;
    public ?array $issueNumbers = [];
    public ?array $mappedIssueNumbers = [];
    public ?bool $approved = null;
    public ?bool $temporarilyRejected = null;
    public ?bool $rejected = null;
    public ?array $rejections = [];
    public ?string $publishDate = null;
    public ?string $commentUrl = null;
    public ?string $downloadUrl = null;
    public ?string $infoUrl = null;
    public ?bool $issueRequested = null;
    public ?bool $downloadAllowed = null;
    public ?int $releaseWeight = null;

    public ?string $magnetUrl = null;
    public ?string $infoHash = null;
    public ?int $seeders = null;
    public ?int $leechers = null;
    public ?string $protocol = null;

    public ?int $comicId = null;
    public ?int $issueId = null;

    public static function fromRequest(Request $request): ReleaseResource
    {
        $request->validate([
            'guid' => 'required|string',
            'indexerId' => 'required|int|gt:0',
        ]);

        $resource = new self();
        $resource->guid = (string)$request->input('guid');
        $resource->indexerId = (int)$request->input('indexerId');

        return $resource;
    }

    public static function fromDownloadDecision(DownloadDecision $decision): ReleaseResource
    {
        /** @var ReleaseInfo */
        $releaseInfo = $decision->remoteIssue->release;
        /** @var ParsedIssueInfo */
        $parsedIssueInfo = $decision->remoteIssue->parsedIssueInfo;
        /** @var RemoteIssue */
        $remoteIssue = $decision->remoteIssue;

        $resource = new self();
        $resource->guid = $releaseInfo->guid;
        $resource->age = $releaseInfo->getAge();
        $resource->ageHours = $releaseInfo->getAgeHours();
        $resource->ageMinutes = $releaseInfo->getAgeMinutes();
        $resource->size = $releaseInfo->size;
        $resource->indexerId = $releaseInfo->indexerId;
        $resource->indexer = $releaseInfo->indexer;
        $resource->releaseGroup = $parsedIssueInfo->releaseGroup;
        $resource->title = $releaseInfo->title;
        $resource->fullComic = $parsedIssueInfo->fullComic;
        $resource->comicTitle = $parsedIssueInfo->comicTitle;
        $resource->issueNumbers = $parsedIssueInfo->issueNumbers;
        $resource->mappedIssueNumbers = array_map(fn(Issue $i) => $i->issue_num, $remoteIssue->issues);
        $resource->approved = $decision->isApproved();
        $resource->temporarilyRejected = $decision->isTemporarilyRejected();
        $resource->rejected = $decision->isRejected();
        $resource->rejections = array_map(fn(Rejection $r) => $r->reason, $decision->rejections);
        $resource->publishDate = $releaseInfo->publishDate->format('Y-m-d');
        $resource->commentUrl = $releaseInfo->commentUrl;
        $resource->downloadUrl = $releaseInfo->downloadUrl;
        $resource->infoUrl = $releaseInfo->infoUrl;
        $resource->issueRequested = $remoteIssue->issueRequested;
        $resource->downloadAllowed = $remoteIssue->downloadAllowed;

        $resource->protocol = $releaseInfo->downloadProtocol;

        $resource->comicId = $remoteIssue->comic?->cvid;

        /** @var Issue[] $remoteIssue->issues */
        if (count($remoteIssue->issues) == 1) {
            $resource->issueId = $remoteIssue->issues[0]->cvid;
        }

        return $resource;
    }
}
