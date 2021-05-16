<?php

namespace App\Libraries\Parser;

use DateTime;
use Illuminate\Contracts\Database\Eloquent\Castable;

class ReleaseInfo implements Castable
{
    public ?string $guid = null;
    public ?string $title = null;
    public ?int $size = null;
    public ?string $downloadUrl = null;
    public ?string $infoUrl = null;
    public ?string $commentUrl = null;
    public ?int $indexerId = null;
    public ?string $indexer = null;
    public ?int $indexerPriority = null;
    public ?string $downloadProtocol = null;
    public ?int $fileCount = null;
    public ?DateTime $publishDate = null;

    public function getAge(): int
    {
        if ($this->publishDate == null) {
            return 0;
        }

        $now = new DateTime();
        $diff = $now->diff($this->publishDate);
        return (int)($diff->format('%a'));
    }

    public function getAgeHours(): int
    {
        if ($this->publishDate == null) {
            return 0;
        }

        $now = time();
        $pubTimestamp = $this->publishDate->format('u');
        return (int)(($now - (int)$pubTimestamp) / 3600);
    }

    public function getAgeMinutes(): int
    {
        if ($this->publishDate == null) {
            return 0;
        }

        $now = time();
        $pubTimestamp = $this->publishDate->format('u');
        return (int)(($now - (int)$pubTimestamp) / 60);
    }

    public function __tostring()
    {
        return sprintf("[%s] %s %s", $this->publishDate->format('Y-m-d h:i:a'), $this->title, $this->size);
    }

    public static function castUsing(array $arguments): string
    {
        return ReleaseInfoCast::class;
    }
}
