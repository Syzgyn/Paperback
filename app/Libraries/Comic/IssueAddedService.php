<?php

namespace App\Libraries\Comic;

use App\Events\IssueInfoRefreshedEvent;
use App\Models\Issue;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;

class IssueAddedService
{
    /** @var array<int, int[]> */
    public static array $cache;

    public function __construct()
    {
        /** @var array<int, int[]> */
        self::$cache = Cache::get("addedIssues", []);
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueInfoRefreshedEvent::class,
            [$this, 'handleIssueInfoRefreshedEvent']
        );
    }

    public function handleIssueInfoRefreshedEvent(IssueInfoRefreshedEvent $event): void
    {
        if ($event->comic->add_options == null) {
            if (!$event->comic->monitored) {
                Log::debug("Comic is not monitored");
                return;
            }

            if (empty($event->added)) {
                Log::debug("No new issues, skipping search");
                return;
            }

            if (empty(array_filter($event->added, fn(Issue $i) => $i->cover_date != null))) {
                Log::debug("No new issues have a cover date");
                return;
            }

            $previouslyReleased = array_filter($event->added, fn(Issue $i) => $i->cover_date != null && $i->monitored && $i->cover_date > now()->subDays(14) && $i->cover_date < now()->addDay());

            if (empty($previouslyReleased)) {
                Log::debug("Newly added issues all get released in the future");
                return;
            }

            self::$cache[$event->comic->cvid] = array_map(fn(Issue $i) => $i->cvid, $previouslyReleased);
            Cache::put("addedIssues", self::$cache);
        }
    }

    public function searchForRecentlyAdded(int $comicId): void
    {
        $previouslyReleased = self::$cache[$comicId];

        if (!empty($previouslyReleased)) {
            /** @var array<int> */
            $missingIds = array_map(fn(int $cvid) => Issue::where('cvid', $cvid)->whereNotNull('issue_file')->pluck('cvid')->all(), $previouslyReleased);

            if (!empty($missingIds)) {
                // Queue::push(new IssueSearchCommand(['issueIds' => $missingIds]));
            }
        }

        unset(self::$cache[$comicId]);
        Cache::put("addedIssues", self::$cache);
    }
}