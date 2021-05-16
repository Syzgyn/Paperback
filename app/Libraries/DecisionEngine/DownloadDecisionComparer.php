<?php

namespace App\Libraries\DecisionEngine;

use App\Libraries\Parser\ReleaseInfo;
use App\Libraries\Parser\RemoteIssue;
use App\Models\Issue;

class DownloadDecisionComparer
{
    /** @var string[] */
    protected static array $comparers = [
        'compareIssueCount',
        'compareIssueNumber',
        'compareIndexerPriority',
        'comparePeersIfTorrent',
        'compareAgeIfUsenet',
        'compareSize',
    ];

    public static function compare(DownloadDecision $a, DownloadDecision $b): int
    {
        foreach(self::$comparers as $comparer) {
            /** @var int $result */
            $result = self::$comparer($a, $b);
            if ($result != 0) {
                return $result;
            }
        }

        return 0;
    }

    protected static function compareBy(object $left, object $right, callable $funcValue): int
    {
        /** @var int|bool */
        $leftValue = $funcValue($left);
        /** @var int|bool */
        $rightValue = $funcValue($right);

        if ($leftValue < $rightValue) {
            return -1;
        } elseif ($leftValue > $rightValue) {
            return 1;
        } else {
            return 0;
        }
    }

    protected static function compareByReverse(object $left, object $right, callable $funcValue): int
    {
        return self::compareBy($left, $right, $funcValue) * -1;
    }

    protected static function compareIssueCount(DownloadDecision $a, DownloadDecision $b): int
    {
        $fullComicCompare = self::compareBy($a->remoteIssue, $b->remoteIssue, fn(RemoteIssue $r) => $r->parsedIssueInfo?->fullComic);

        if ($fullComicCompare != 0) {
            return $fullComicCompare;
        }

        return self::compareByReverse($a->remoteIssue, $b->remoteIssue, fn(RemoteIssue $r) => count($r->issues));
    }

    protected static function compareIssueNumber(DownloadDecision $a, DownloadDecision $b): int
    {
        //Compare by lowest issue number in each remoteIssue
        return self::compareByReverse($a->remoteIssue, $b->remoteIssue, 
            fn(RemoteIssue $x) => array_reduce($x->issues, fn(int $c, Issue $i) => min([$c, $i->issue_num]), 10000));
    }

    protected static function compareIndexerPriority(DownloadDecision $a, DownloadDecision $b): int
    {
        if ($a->remoteIssue->release == null ||
            $b->remoteIssue->release == null) {
            return 0;
        }

        return self::compareByReverse($a->remoteIssue->release, $b->remoteIssue->release, fn(ReleaseInfo $x) => $x->indexerPriority);
    }

    protected static function comparePeersIfTorrent(DownloadDecision $a, DownloadDecision $b): int
    {
        //TODO once torrents are implemented
        return 0;
    }

    protected static function compareAgeIfUsenet(DownloadDecision $a, DownloadDecision $b): int
    {
        if ($a->remoteIssue->release == null ||
            $b->remoteIssue->release == null ||
            $a->remoteIssue->release->downloadProtocol != 'usenet' ||
            $b->remoteIssue->release->downloadProtocol != 'usenet') {
            return 0;
        }

        return self::compareBy($a->remoteIssue, $b->remoteIssue, function(RemoteIssue $r) {
            if ($r->release == null) {
                return 0;
            }

            $ageHours = $r->release->getAgeHours();
            $age = $r->release->getAge();

            if ($ageHours < 1) {
                return 1000;
            }

            if ($ageHours <= 24) {
                return 100;
            }

            if ($age <= 7) {
                return 10;
            }

            return 1;
        });
    }

    protected static function compareSize(DownloadDecision $a, DownloadDecision $b): int
    {
        //Round size to closest megabit
        return self::compareBy($a->remoteIssue, $b->remoteIssue, fn(RemoteIssue $x) => round($x->release?->size ?? 0, 1000));
    }
}
