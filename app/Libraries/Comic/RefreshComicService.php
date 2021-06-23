<?php

namespace App\Libraries\Comic;

use App\Events\ComicRefreshCompletedEvent;
use App\Libraries\Commands\CommandTrigger;
use App\Libraries\Commands\RefreshComicCommand;
use App\Models\Comic;
use App\Models\Issue;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;

class RefreshComicService
{
    public static function subscribe(Dispatcher $events): void
    {
        $events->listen(
            RefreshComicCommand::class,
            [self::class, 'handleRefreshComicCommand'],
        );
    }

    public static function handleRefreshComicCommand(RefreshComicCommand $command): void
    {
        $trigger = $command->trigger;
        $isNew = $command->isNewComic;

        if (!empty($command->comicId)) {
            $comic = Comic::find($command->comicId);

            try {
                $comic = self::refreshComicInfo($command->comicId);
                self::rescanComic($comic, $isNew, $trigger);
            } catch (Exception $e) {
                Log::error("Couldn't refresh info for " . $comic->title, ['exception' => $e]);
                self::rescanComic($comic, $isNew, $trigger);

                throw $e;
            }
        } else {
            $comics = Comic::all()->sortBy('title');

            foreach ($comics as $comic) {
                $comicLocal = $comic;

                if ($trigger == CommandTrigger::MANUAL || self::shouldRefresh($comicLocal)) {
                    try {
                        $comicLocal = self::refreshComicInfo($comicLocal->cvid);
                    } catch (Exception $e) {
                        Log::error("Couldn't refresh info for " . $comicLocal->title, ['exception' => $e]);
                    }

                    self::rescanComic($comicLocal, false, $trigger);
                } else {
                    Log::info("Skipping refresh of comic: " . $comicLocal->title);
                }
            }
        }

        event(new ComicRefreshCompletedEvent());
    }

    public static function shouldRefresh(Comic $comic): bool
    {
        if ($comic->last_info_sync < now()->subDays(30)) {
            Log::debug(sprintf("Comic %s last updated more than 30 days ago, should refresh.", $comic->title));
            return true;
        }

        if ($comic->last_info_sync >= now()->addHours(6)) {
            Log::debug(sprintf("Comic %s last updated less than 6 hours ago, should not be refreshed.", $comic->title));
            return false;
        }

        if ($comic->status != ComicStatusType::ENDED) {
            Log::debug(sprintf("Comic %s is not ended, should refresh.", $comic->title));
            return true;
        }

        /** @var ?Issue */
        $lastIssue = $comic->issues->sortBy('cover_date')->first();

        if ($lastIssue != null && $lastIssue->cover_date > now()->subDays(30)) {
            Log::debug(sprintf("Last issue in %s aired less than 30 days ago, should refresh", $comic->title));
            return true;
        }

        Log::debug(sprintf("Comic %s ended long ago, should not be refreshed.", $comic->title));
        return false;
    }

    /** @param CommandTrigger::* $trigger */
    protected static function rescanComic(Comic $comic, bool $isNew, int $trigger): void
    {
        $rescanAfterRefresh = resolve("AppSettings")->get('mediamanagement', 'rescanAfterRefresh');
        $shouldRescan = true;

        if ($isNew) {
            Log::debug(sprintf("Forcing rescan of %s. Reason: new comic", $comic->title));
            $shouldRescan = true;
        } elseif ($rescanAfterRefresh == "never") {
            Log::debug(sprintf("Skipping rescan of %s. Reason: never rescan after refresh", $comic->title));
            $shouldRescan = false;
        } elseif ($rescanAfterRefresh == "afterManual" && $trigger != CommandTrigger::MANUAL) {
            Log::debug(sprintf("Skipping rescan of %s. Reason: not after automatic scans". $comic->title));
            $shouldRescan = false;
        }

        if (!$shouldRescan) {
            return;
        }

        try {
            resolve("DiskScanService")->scan($comic);
        } catch (Exception $e) {
            Log::error("Couldn't rescan comic " . $comic->title, ['exception' => $e]);
        }
    }

    protected static function refreshComicInfo(int $comicId): Comic
    {
        $comic = Comic::find($comicId);

        Log::info("Updating " . $comic->title);

        $comicInfo = null;
        $issues = [];

        try {
            $comicInfo = resolve("ComicVineRepository")->volume($comicId);
            $issues = resolve("ComicVineRepository")->volumeIssues($comicId);
        } catch (Exception $e) {
            Log::debug("Failed to update comic " . $comic->title, ['exception' => $e]);

            throw $e;
        }

        $comic->title = $comicInfo['title'];
        $comic->year = $comicInfo['year'];
        $comic->overview = $comicInfo['overview'];
        $comic->images = $comicInfo['images'];
        $comic->publisher = $comicInfo['publisher'];
        $comic->status = ComicStatusType::fromString($comicInfo['status']);
        // $comic->path = realpath($comic->path);

        $comic->save();

        RefreshIssueService::refreshIssueInfo($comic, $issues);

        Log::debug("Finished comic refresh for " . $comic->title);
        // event(new ComicUpdatedEvent($comic));

        return $comic;
    }
}