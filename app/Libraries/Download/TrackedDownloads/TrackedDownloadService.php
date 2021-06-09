<?php

namespace App\Libraries\Download\TrackedDownloads;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Download\DownloadProtocol;
use App\Libraries\Download\History\DownloadHistoryEventType;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use App\Libraries\Parser\Parser;
use App\Models\Comic;
use App\Models\DownloadHistory;
use App\Models\Issue;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TrackedDownloadService
{
    /** @var TrackedDownload[] */
    public static array $cache;

    public function __construct()
    {
       /** @var TrackedDownload[] */
        self::$cache = Cache::get("trackedDownloads", []);
    }

    /** @return TrackedDownload[] */
    public function getTrackedDownloads(): array
    {
        return self::$cache;
    }

    public function find(?string $downloadId): ?TrackedDownload
    {
        if ($downloadId == null) {
            return null;
        }

        return self::$cache[$downloadId] ?? null;
    }

    /** @param string[] $downloadIds */
    public function stopTracking(array $downloadIds): void
    {
        $removed = [];

        foreach($downloadIds as $id) {
            $trackedDownload = $this->find($id);

            if ($trackedDownload != null) {
                unset(self::$cache[$id]);
                $removed[] = $trackedDownload;
            }

            //TODO: event(new TrackedDownloadsRemovedEvent($removed));
        }
        
        $this->saveCache();
    }

    public function trackDownload(DownloadClientModelBase $client, DownloadClientItem $item): ?TrackedDownload
    {
        $existingItem = $this->find($item->downloadId);

        if ($existingItem != null && $existingItem->state != TrackedDownloadState::DOWNLOADING) {
            $this->logItemChange($existingItem, $existingItem->downloadItem, $item);
            $existingItem->downloadItem = $item;
            $existingItem->isTrackable = true;

            return $existingItem;
        }

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
                $state = $this->getStateFromHistory($downloadHistory->event_type);
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
                        /** @var Issue[] */
                        $issues = $historyItems->where('event_type', IssueHistoryEventType::GRABBED)->map(function(IssueHistory $item): Issue {
                            /** @var Issue */
                            return $item->issue;
                        })->all();
                        /** @var Comic */
                        $comic = $firstHistoryItem->comic;
                        $trackedDownload->remoteIssue = resolve("ParserService")->mapFromIssueIds(
                            $parsedIssueInfo, 
                            $comic,
                            $issues
                        );
                    }
                }
            }

            if ($trackedDownload->remoteIssue == null) {
                Log::debug(sprintf("No issue found for download '%s'", $trackedDownload->downloadItem->title ?? "Unknown Title"));
            }

        } catch (Exception $e) {
            Log::debug("Failed to find issue for " . $item->title, ['exception' => $e]);
            return null;
        }

        $this->logItemChange($trackedDownload, $existingItem?->downloadItem, $trackedDownload->downloadItem);

        assert($trackedDownload->downloadItem->downloadId != null);
        self::$cache[$trackedDownload->downloadItem->downloadId] = $trackedDownload;

        return $trackedDownload;
    }

     /**
     * @return TrackedDownloadState::*
     */
    protected function getStateFromHistory(int $eventType): int
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

    public function updateTrackable(array $trackedDownloads): void
    {
        $keys = array_map(fn(TrackedDownload $t) => $t->downloadItem->downloadId ?? null, $trackedDownloads);
        $keys = array_filter($keys);

        $cache = $this->getTrackedDownloads();

        foreach ($cache as $key => $cachedDownload) {
            if (!in_array($key, $keys)) {
                $cache[$key]->isTrackable = false;
            }
        }

        $this->saveCache($cache);
    }

    // This works by reference
    protected function updateCachedItem(TrackedDownload $trackedDownload): void
    {
        assert($trackedDownload->downloadItem != null && $trackedDownload->downloadItem->title != null);

        $parsedIssueInfo = Parser::parseTitle($trackedDownload->downloadItem->title);
        $trackedDownload->remoteIssue = $parsedIssueInfo == null ? null : resolve("ParserService")->map($parsedIssueInfo);
    }

    /** @param TrackedDownload[] $cache */
    public function saveCache(array $cache = null): void
    {
        if ($cache) {
            self::$cache = $cache;
        }
        Cache::put("trackedDownloads", self::$cache);
    }

    protected function logItemChange(TrackedDownload $trackedDownload, ?DownloadClientItem $existingItem, DownloadClientItem $downloadItem): void
    {
        if ($existingItem == null ||
            $existingItem->status != $downloadItem->status ||
            $existingItem->canBeRemoved != $downloadItem->canBeRemoved ||
            $existingItem->canMoveFiles != $downloadItem->canMoveFiles
        )
        {
            Log::debug(sprintf(
                "Tracking '%s:%s': ClientState=%s%s Stage='%s' Issue='%s' OutputPath='%s'",
                $downloadItem->downloadClientInfo->name ?? "Unknown Name",
                $downloadItem->title ?? "Unknown Title",
                $downloadItem->status ?? "Unknown Status",
                $downloadItem->canBeRemoved ? "" : ($downloadItem->canMoveFiles ? "(busy)" : "(readonly)"),
                TrackedDownloadState::toString($trackedDownload->state),
                (string) $trackedDownload->remoteIssue?->parsedIssueInfo,
                (string) $downloadItem->outputPath,
            ));
        }
    }
}