<?php

namespace App\Libraries\Parser;

use App\Models\Comic;
use App\Models\Issue;
use DateTime;
use DateInterval;

/** @package App\Libraries\Parser 
 * @property Issue[] $issues
*/
class RemoteIssue
{
    public ?ReleaseInfo $release = null;
    public ?ParsedIssueInfo $parsedIssueInfo = null;
    public ?Comic $comic = null;
    /** @var Issue[] */
    public array $issues = [];
    public bool $issueRequested = false;
    public bool $downloadAllowed = false;
    //TODO
    //public TorrentSeedConfiguration $seedConfiguration

    public function isRecentIssue(): bool
    {
        return array_reduce($this->issues, function(bool $carry, Issue $issue) {
            if ($carry) {
                return $carry;
            }

            if (!$issue->store_date && !$issue->cover_date) {
                return false;
            }

            $store_dt = new DateTime($issue->store_date ?? '1000-01-01'); 
            $cover_dt = new DateTime($issue->cover_date ?? '1000-01-01');
            $checkDate = new DateTime();

            $checkDate->sub(new DateInterval('P14D'));
            
            return $store_dt >= $checkDate || $cover_dt >= $checkDate;
        }, false);
    }

    public function __tostring()
    {
        return $this->release?->title ?? "";
    }
}
