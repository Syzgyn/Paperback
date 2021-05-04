<?php

namespace App\Libraries\Parser;

use DateTime;

class ReleaseInfo
{
    public string $guid;
    public string $title;
    public int $size;
    public string $downloadUrl;
    public ?string $infoUrl;
    public ?string $commentUrl;
    public int $indexerId;
    public string $indexer;
    public int $indexerPriority;
    public string $downloadProtocol;
    public DateTime $publishDate;

    public function getAge()
    {
        $now = new DateTime();
        $diff = $now->diff($this->publishDate);
        return (int)($diff->format('a'));
    }

    public function getAgeHours()
    {
        $now = time();
        $pubTimestamp = $this->publishDate->format('u');
        return ($now - $pubTimestamp) / 3600;
    }

    public function getAgeMinutes()
    {
        $now = time();
        $pubTimestamp = $this->publishDate->format('u');
        return ($now - $pubTimestamp) / 60;
    }

    public function __tostring()
    {
        return sprintf("[%s] %s %s", $this->publishDate->format('Y-m-d h:i:a'), $this->title, $this->size);
    }
}
