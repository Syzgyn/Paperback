<?php

namespace App\Libraries\Comic;

use App\Events\IssueInfoRefreshedEvent;
use App\Models\Comic;
use App\Models\Issue;
use Exception;
use Illuminate\Support\Facades\Log;

class RefreshIssueService
{
    /** @param array[] $remoteIssues */
    public static function refreshIssueInfo(Comic $comic, array $remoteIssues): void
    {
        Log::info("Starting issue refresh for " . $comic->title);

        $successCount = 0;
        $failCount = 0;

        /** @var Issue[] */
        $existingIssues = Issue::where('comic_id', $comic->cvid)->get()->all();
        $hasExisting = !empty($existingIssues);

        $updateList = [];
        $newList = [];

        /** @var array $issue */
        foreach (self::orderIssues($remoteIssues) as $issue) {
            try {
                $issueToUpdate = self::getIssueToUpdate($comic, $issue, $existingIssues);

                if ($issueToUpdate != null) {
                    //Remove match from existing issues
                    foreach ($existingIssues as $key => $existingIssue) {
                        if ($existingIssue->issue_num == $issue['issue_num']) {
                            unset($existingIssues[$key]);
                            break;
                        }
                    }

                    $updateList[] = $issueToUpdate;
                } else {
                    $issueToUpdate = new Issue();
                    $issueToUpdate->monitored = $comic->monitored;
                    $newList[] = $issueToUpdate;
                }

                $issueToUpdate->comic_id = $comic->cvid;
                $issueToUpdate->issue_num = $issue['issue_num'];
                $issueToUpdate->title = $issue['title'];
                $issueToUpdate->overview = $issue['overview'];
                $issueToUpdate->store_date = $issue['store_date'];
                $issueToUpdate->cover_date = $issue['cover_date'];
                $issueToUpdate->cvid = $issue['cvid'];
                $issueToUpdate->images = $issue['images'];

                $successCount++;
            } catch (Exception $e) {
                Log::critical(sprintf("An error has occured while updating issue info for comic %s. %s", $comic->title, (string) $issue['title']),
                    ['exception' => $e]);
                $failCount++;
            }
        }
        
        self::unmonitorReaddedIssues($comic, $newList, $hasExisting);

        //Delete any existing issues that didn't match with updated data
        foreach ($existingIssues as $existingIssue) {
            $existingIssue->delete();
        }

        foreach ($updateList as $updatedIssue) {
            $updatedIssue->save();
        }

        foreach ($newList as $newIssue) {
            $newIssue->save();
        }

        event(new IssueInfoRefreshedEvent($comic, $newList, $updateList, $existingIssues));

        if ($failCount != 0) {
            Log::info(sprintf("Finished issue refresh for comic: %s.  Successful: %d - Failed: %d", $comic->title, $successCount, $failCount));
        } else {
            Log::info("Finished issue refresh for comic: " . $comic->title);
        }
    }

    /** @param array[] $issues */
    protected static function orderIssues(array $issues): array
    {
        usort($issues, fn(array $a, array $b) => $a['issue_num'] <=> $b['issue_num']);

        return $issues;
    }

    /** @param Issue[] $existingIssues */
    protected static function getIssueToUpdate(Comic $comic, array $issue, array $existingIssues): ?Issue
    {
        foreach ($existingIssues as $existingIssue) {
            if ($issue['issue_num'] == $existingIssue->issue_num) {
                return $existingIssue;
            }
        }

        return null;
    }

    /** @param Issue[] $issues */
    protected static function unmonitorReaddedIssues(Comic $comic, array $issues, bool $hasExisting): void
    {
        if ($comic->add_options != null) {
            return;
        }

        $threshold = now()->subDays(14);

        $oldIssues = array_filter($issues, fn(Issue $i) => $i->cover_date && $i->cover_date < $threshold);

        if (!empty($oldIssues)) {
            if ($hasExisting) {
                Log::warning(sprintf("Comic %d (%s) had %d old issues appear, please check monitored status.", $comic->cvid, $comic->title, count($oldIssues)));
            } else {
                $threshold = now()->subDay();

                foreach ($issues as $issue) {
                    if ($issue->cover_date && $issue->cover_date < $threshold) {
                        $issue->monitored = false;
                    }
                }

                Log::warning(sprintf("Comic %d (%s) had %d old issues appear, unmonitored released issues to prevent unexpected downloads", $comic->cvid, $comic->title, count($oldIssues)));
            }
        }
    }
}