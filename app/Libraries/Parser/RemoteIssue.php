<?php

namespace App\Libraries\Parser;

use App\Models\Comic;
use DateTime;
use DateInterval;

class RemoteIssue
{
    public ReleaseInfo $release;
    public ParsedIssueInfo $parsedIssueInfo;
    public Comic $comic;
    public array $issues = [];
    public bool $issueRequested = false;
    public bool $downloadAllowed = false;
    //TODO
    //public TorrentSeedConfiguration $seedConfiguration

    public function isRecentIssue(): bool
    {
        return array_reduce($this->issues, function($carry, $issue) {
            if ($carry) {
                return $carry;
            }

            if (!$issue->store_date && !$issue->cover_date) {
                return false;
            }

            $store_dt = new DateTime($issue->store_date ?? '1000-01-01'); 
            $cover_dt = new DateTime($issue->cover_date ?? '1000-01-01');
            $now = new DateTime();

            $now->sub(new DateInterval('P14D'));
            
            return $store_dt >= $now || $cover_dt >= $now;
        }, false);
    }

    public function __tostring()
    {
        return $this->release->title;
    }
}
