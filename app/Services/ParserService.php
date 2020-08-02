<?php

namespace App\Services;

use App\Models\Comic;
use App\Models\Issue;
use App\Dto\SearchResultCollection;

class ParserService
{
    protected static $_comics;
    protected $issue;
    protected $comic;

    public function setIssue(int $cvid)
    {
        $this->issue = Issue::find($cvid);

        return $this;
    }

    public function setComic(int $cvid)
    {
        $this->comic = Comic::find($cvid);

        return $this;
    }

    protected function getComics()
    {
        if (isset(self::$_comics)) {
            return self::$_comics;
        }

        self::$_comics = Comic::all();

        return self::$_comics;
    }

    protected function finish()
    {
        unset($this->issue);
        unset($this->comic);
    }

    public function parseSearchResults(SearchResultCollection $results)
    {
        $output = [];

        foreach ($results as $result) {
            if (! $issue = $this->issue) {
                $issue = Issue::find($result->issue_id);
            }

            //Step 0: Make sure result came after issue was released
            $resultDate = new \DateTime($result->date);
            $comicDate = new \DateTime($issue->release_date);
            if ($resultDate < $comicDate) {
                continue;
            }

            //Divide the result title into parts
            $searchTitleParts = $this->splitTitle($result->title);

            //Step 1: Match the comic title
            if (! $this->checkTitle($searchTitleParts, $issue->comic->name)) {
                continue;
            }

            //Step 2: Match issue number
            if (! $this->checkIssueNum($searchTitleParts, $issue->issue_num)) {
                dd('issue num');
                continue;
            }

            //Step 3: Match year
            if (! $this->checkYear($searchTitleParts, $issue->release_date)) {
                dd('year');
                continue;
            }

            $output[] = $result;
        }

        $this->finish();

        return $output;
    }

    public function splitTitle(string $title)
    {
        preg_match_all('/([\w]+)/', strtolower($title), $parts);
        $parts = $parts[0];
        foreach ($parts as $index => $part) {
            //Has numbers and letters
            if (preg_match('/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/', $part)) {
                $subParts = preg_split('/(?<=\D)(?=\d)|(?<=\d)(?=\D)/', $part);
                array_splice($parts, $index, 1, $subParts);
            }
        }

        return $parts;
    }

    public function checkTitle(array &$searchTitleParts, string $comicTitle)
    {
        preg_match_all('/([\w]+)/', strtolower($comicTitle), $comicTitleParts);

        $comicTitleParts = $comicTitleParts[0];

        //Get all occurances of the first part of the comic title in the search title
        $titlePart = array_shift($comicTitleParts);
        $keys = array_keys($searchTitleParts, $titlePart);

        if (empty($keys)) {
            return false;
        }

        //Single word title
        if (empty($comicTitleParts)) {
            //Assume the title is the first result if multiple
            unset($searchTitleParts[$keys[0]]);

            return true;
        }

        $titleMatches = false;
        foreach ($keys as $index) {
            foreach ($comicTitleParts as $i => $value) {
                if (($i + $index + 1) >= count($searchTitleParts)) {
                    break;
                }

                if ($searchTitleParts[$index + $i + 1] !== $value) {
                    break;
                }

                if ($i === count($comicTitleParts) - 1) {
                    $titleMatches = true;
                    break;
                }
            }

            if ($titleMatches) {
                //Remove title parts from later checks
                unset($searchTitleParts[$index]);
                foreach ($comicTitleParts as $i => $value) {
                    unset($searchTitleParts[$index + $i + 1]);
                }

                break;
            }
        }

        return $titleMatches;
    }

    public function checkIssueNum(array &$searchTitleParts, int $issueNum)
    {
        foreach ($searchTitleParts as $index => $part) {
            if (! is_numeric($part)) {
                continue;
            }

            for ($i = 2; $i <= 4; $i++) {
                if (sprintf("%0{$i}d", $issueNum) === $part) {
                    unset($searchTitleParts[$index]);

                    return true;
                }
            }
        }

        return false;
    }

    public function checkYear(array &$searchTitleParts, string $issueDate)
    {
        $dt = new \DateTime($issueDate);
        $year = $dt->format('Y');

        foreach ($searchTitleParts as $index => $part) {
            if (! is_numeric($part)) {
                continue;
            }

            if ($part === $year) {
                unset($searchTitleParts[$index]);

                return true;
            } else {
                //If we're at the beginning or end of the year, see if it was just mislabeled
                $month = $dt->format('n');
                if ($month == 1 && ($part + 1) == $year) {
                    unset($searchTitleParts[$index]);

                    return true;
                }

                if ($month == 12 && ($part - 1) == $year) {
                    unset($searchTitleParts[$index]);

                    return true;
                }
            }
        }

        return false;
    }

    public function matchDirToComics(string $dir)
    {
        foreach ($this->getComics() as $comic) {
            if ($dir == $comic->fullDirectoryName) {
                return true;
            }
        }

        return false;
    }

    public function getComicInfoFromString(string $data)
    {
        $regexes = [
            '/(?<name>.+)\((?<year>\d{2,4})\)$/',
            '/(?<name>.+)\[(?<year>\d{2,4})\]$/',
            '/(?<name>.+) (?<year>\d{2,4})$/',
            '/(?<name>.+)$/'
        ];

        $name = null;
        $year = null;

        foreach ($regexes as $regex) {
            preg_match($regex, $data, $match);
            if (isset($match[0])) {
                $name = $match['name'];
                $year = $match['year'] ?? null;
                break;
            }
        }

        $last = substr($name, -1);
        if ($last == '_') {
            $name = str_replace('_', ' ', $name);
        } elseif ($last == '.') {
            $name = str_replace('.', ' ', $name);
        }

        $name = trim($name);

        return [
            'name' => $name,
            'year' => $year,
        ];
    }

    public function getIssueInfoFromFile(string $file)
    {
        $regexes = [
            '/(?<name>.+) (?<issueNum>\d{1,3})/',
            '/(?<name>.+) (?<issueNum>\d{1,3}) \((?<year>\d{2,4})\)/',
        ];

        $filename = pathinfo($file, PATHINFO_FILENAME);
        $name = null;
        $issueNum = null;
        $year = null;

        foreach ($regexes as $regex) {
            preg_match($regex, $filename, $match);
            if (isset($match[0])) {
                $name = $match['name'];
                $issueNum = $match['issueNum'];
                break;
            }
        }

        $name = trim($name);

        return [
            'name' => $name,
            'issueNum' => $issueNum,
            'year' => $year,
        ];
    }
}
