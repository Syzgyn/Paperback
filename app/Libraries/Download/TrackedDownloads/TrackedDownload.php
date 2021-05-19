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

    public static function fromDownloadClient(DownloadClientModelBase $client, DownloadClientItem $item): self
    {
        // $existingItem = self::find($item->downloadId);

        // if ($existingItem != null && $existingItem->state != TrackedDownloadState::DOWNLOADING) {
        //     //TODO: Log item change
        //     $existingItem->downloadItem = $item;
        //     $existingItem->isTrackable = true;

        //     return $existingItem;
        // }

        $trackedDownload = new TrackedDownload();
        $trackedDownload->downloadClient = $client->id;
        $trackedDownload->downloadItem = $item;
        $trackedDownload->protocol = DownloadProtocol::fromStr($client->getProtocol());
        $trackedDownload->isTrackable = true;

        try {
            if ($item->title == null || $item->downloadId == null) {
                throw new Exception("Unable to parse download client item with missing info");
            }
            $parsedIssueInfo = Parser::parseTitle($item->title);
            $historyItems = IssueHistory::findByDownloadId($item->downloadId);

            if ($parsedIssueInfo != null) {
                $trackedDownload->remoteIssue = resolve('ParserService')->map($parsedIssueInfo);
            }

            /** @var ?DownloadHistory */
            $downloadHistory = resolve('DownloadHistoryService')->getLatestDownloadHistoryItem($item->downloadId);

            if ($downloadHistory != null) {
                $state = self::getStateFromHistory($downloadHistory->event_type);
                $trackedDownload->state = $state;
            }

            if (count($historyItems) > 0) {
                /** @var IssueHistory */
                $firstHistoryItem = $historyItems->first();
                /** @var IssueHistory */
                $grabbedEvent = $historyItems->firstWhere("event_type", IssueHistoryEventType::GRABBED);

                /** @var ?string */
                $trackedDownload->indexer = $grabbedEvent->data['Indexer'] ?? null;

                if ($parsedIssueInfo == null ||
                    $trackedDownload->remoteIssue == null ||
                    $trackedDownload->remoteIssue->comic == null ||
                    empty($trackedDownload->remoteIssue->issues)
                ) {
                    $parsedIssueInfo = Parser::parseTitle($firstHistoryItem->source_title);

                    if ($parsedIssueInfo != null) {
                        $trackedDownload->remoteIssue = resolve("ParserService")->mapFromIssueIds(
                            $parsedIssueInfo, 
                            $firstHistoryItem->comic,
                            /** @var Issue[] */
                            $historyItems->where('event_type', IssueHistoryEventType::GRABBED)->map(function(IssueHistory $item): Issue {
                                /** @var Issue */
                                return $item->issue;
                            })->all()
                        );
                    }
                }
            }

            if ($trackedDownload->remoteIssue == null) {
                //TODO: Log
            }

        } catch (Exception $e) {
            //TODO: Log
        }

        //TODO: Log item change
        return $trackedDownload;
    }

    /**
     * @return TrackedDownloadState::*
     */
    protected static function getStateFromHistory(int $eventType): int
    {
        switch ($eventType) {
            case DownloadHistoryEventType::DOWNLOAD_IMPORTED:
                return TrackedDownloadState::IMPORTED;
            case DownloadHistoryEventType::DOWNLOAD_FAILED:
                return TrackedDownloadState::FAILED;
            case DownloadHistoryEventType::DOWNLOAD_IGNORED:
                return TrackedDownloadState::IGNORED;
            default:
                return TrackedDownloadState::DOWNLOADING;
        }
    }
}