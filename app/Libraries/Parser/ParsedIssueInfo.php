<?php

namespace App\Libraries\Parser;

class ParsedIssueInfo
{
    public string $releaseTitle;
    public ?string $comicTitle = null;
    public ComicTitleInfo $comicTitleInfo;
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
            $issueString = explode("-", array_map($this->issueNumbers, fn($n) => sprintf("%02d", $n)));
        }

        return sprintf("%s - %s", $this->comicTitle, $issueString);
    }
}

