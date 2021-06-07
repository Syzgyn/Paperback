<?php

namespace App\Libraries\Parser;

use App\Models\Comic;
use App\Libraries\IndexerSearch\SearchCriteriaBase;
use App\Models\Issue;
use Illuminate\Database\Eloquent\Builder;

class ParserService
{
    public function map(ParsedIssueInfo $parsedIssueInfo, ?SearchCriteriaBase $searchCriteria = null, ?Comic $comic = null): RemoteIssue
    {
        $remoteIssue = new RemoteIssue();
        $remoteIssue->parsedIssueInfo = $parsedIssueInfo;

        if ($comic == null && $searchCriteria != null) {
            $comic = $this->getComic($parsedIssueInfo, $searchCriteria);
        }

        if ($comic != null) {
            $remoteIssue->comic = $comic;
            $remoteIssue->issues = $this->getIssues($parsedIssueInfo, $comic, $searchCriteria);

        }

        if ($searchCriteria != null) {
            $remoteIssue->issueRequested = count(array_filter(
                                                $remoteIssue->issues, 
                                                fn(Issue $i) => $searchCriteria->findIssueByNum($i->issue_num) !== null)
                                        ) > 0;
        }
        return $remoteIssue;
    }

    /** @param Issue[] $issues */
    public function mapFromIssueIds(ParsedIssueInfo $parsedIssueInfo, Comic $comic, array $issues): RemoteIssue
    {
        $remoteIssue = new RemoteIssue();
        $remoteIssue->parsedIssueInfo = $parsedIssueInfo;
        $remoteIssue->comic = $comic;
        $remoteIssue->issues = $issues;

        return $remoteIssue;
    }

    protected function getComic(ParsedIssueInfo $parsedIssueInfo, SearchCriteriaBase $searchCriteria): ?Comic
    {
        if ($this->cleanComicTitle($searchCriteria->comic->title) === $this->cleanComicTitle($parsedIssueInfo->comicTitle)) {
            return $searchCriteria->comic;
        }

        //TODO: implement clean titles in database and use those for matching
        /** @psalm-var Comic|null */
        $comic = Comic::firstWhere('title', $parsedIssueInfo->comicTitle);

        if ($comic == null && !empty($parsedIssueInfo->comicTitleInfo->year)) {
            $comic = Comic::firstWhere([
                'title' => $parsedIssueInfo->comicTitleInfo->titleWithoutYear,
                'year' => $parsedIssueInfo->comicTitleInfo->year,
            ]);
        }

        if ($comic == null) {
            //TODO: Logging
            return null;
        }

        return $comic;
    }

    public function getComicFromTitle(string $title): ?Comic
    {
        $parsedIssueInfo = Parser::parseTitle($title);

        if ($parsedIssueInfo == null) {
            return Comic::firstWhere("title", $title); //TODO: Replace with more accurate version
        }

        $comic = Comic::firstWhere("title", $parsedIssueInfo->comicTitle);

        if ($comic == null) {
            /** @var ?Comic */
            $comic = Comic::whereTitle($parsedIssueInfo->comicTitleInfo?->titleWithoutYear)
                ->when($parsedIssueInfo->comicTitleInfo?->year, function(Builder $b) use ($parsedIssueInfo) {
                    return $b->where('year', (string) $parsedIssueInfo->comicTitleInfo?->year);
            })->first();
        }

        return $comic;
    }

    public function cleanComicTitle(?string $title = ""): string 
    {
        if (is_numeric($title)) {
            return $title;
        }

        assert($title != null);

        $title = preg_replace([
                Patterns::$percentRegex,
                Patterns::$normalizeRegex,
            ],
            [
                "percent",
                "",
            ], $title);

        $title = strtolower($title);

        return $this->stripAccents($title);
    }

    // From https://stackoverflow.com/a/11743977
    public function stripAccents(string $str): string
    {
        return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
    }

    /** @return Issue[] */
    public function getIssues(ParsedIssueInfo $parsedIssueInfo, Comic $comic, ?SearchCriteriaBase $searchCriteria = null): array
    {
        if ($parsedIssueInfo->fullComic) {
            return $comic->issues->all(); 
        }

        if (empty($parsedIssueInfo->issueNumbers)) {
            return [];
        }

        $results = [];

        /** @psalm-var int $issueNumber */
        foreach ($parsedIssueInfo->issueNumbers as $issueNumber) {
            $issue = null;
            if ($searchCriteria != null) {
                $issue = $searchCriteria->findIssueByNum($issueNumber);
            }

            if ($issue == null) {
                /** @var ?Issue */
                $issue = Issue::firstWhere(['comic_id' => $comic->cvid, 'issue_num' => $issueNumber]);
            }

            if ($issue != null) {
                $results[] = $issue;
            } else {
                //TODO: Logger
            }
        }

        return $results;
    }
}
