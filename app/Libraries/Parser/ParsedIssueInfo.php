<?php

namespace App\Libraries\Parser;

class ParsedIssueInfo
{
    public ?string $releaseTitle = null;
    public ?string $comicTitle = null;
    public ?ComicTitleInfo $comicTitleInfo = null;
    public array $issueNumbers = [];
    public bool $fullComic = false;
    public bool $isPartialComic = false;
    public ?string $releaseGroup = null;

    public function __tostring()
    {
        $issueString = "[Unknown Issue]";

        if ($this->fullComic) {
            $issueString = "Complete";
        } elseif (!empty($this->issueNumbers)) {
            $issueString = implode("-", array_map(fn(int $n) => sprintf("%02d", $n), $this->issueNumbers));
        }

        return sprintf("%s - %s", $this->comicTitle ?? "Unknown Title", $issueString);
    }
}

