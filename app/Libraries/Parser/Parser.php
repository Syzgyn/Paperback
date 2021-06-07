<?php

namespace App\Libraries\Parser;

use Exception;
use App\Libraries\MediaFiles\IssueFileExtensions;

class Parser
{
    public static function parseTitle(string $title): ?ParsedIssueInfo
    {
        try {
            if (!self::validateBeforeParsing($title)) {
                return null;
            }

            $releaseTitle = self::removeFileExtension($title);
            $releaseTitle = str_replace(["【", "】"], ["[", "]"], $releaseTitle);

            $simpleTitle = preg_replace(Patterns::$cleanFileTypeRegex, "", $releaseTitle);

            foreach(Patterns::$reportTitleRegexes as $regex) {
                $matches = [];
                preg_match_all($regex, $simpleTitle, $matches, PREG_SET_ORDER);
                if (!empty($matches)) {
                    $result = self::ParseTitleMatches($matches, $releaseTitle);

                    if ($result) {
                        //$result->fileType = self::parseFileType($title); //TODO
                        $result->releaseGroup = self::parseReleaseGroup($releaseTitle);
                        
                        return $result;
                    }
                 }
            }
        } catch (Exception $e) {
            //TODO: add logger
        }

        return null;
    }

    protected static function validateBeforeParsing(string $title): bool
    {
        if (str_contains(strtolower($title), "password") && str_contains(strtolower($title), "yenc")) {
            return false;
         }

        //No letters or numbers
         if (preg_match('/[a-z0-9]/i', $title) === false) {
            return false;
        }
 
        $titleWithoutExtension = self::removeFileExtension($title);
        if (self::matchesAnyRegex(Patterns::$rejectedHashedReleasesRegexes, $titleWithoutExtension)) {
            return false;
        }

         return true;
    }

     public static function removeFileExtension(string $title): string
    {
        $extensions = IssueFileExtensions::$extensions + ['.par2', '.nbz'];
         $title = preg_replace_callback(Patterns::$fileExtensionRegex, function(array $match) use ($extensions) {
            $extension = strtolower((string) $match[0]);
            
             if (in_array($extension, $extensions)) {
                return "";
            }

            return (string) $match[0];
        }, $title);

        return $title;
    }

    /** @param string[] $regexes */
    protected static function matchesAnyRegex(array $regexes, string $match): bool
    {
        foreach($regexes as $regex) {
            if (preg_match($regex, $match) > 0) {
                return true;
            }
        }
        
        return false;
    }

    /** @param non-empty-list<array<array-key, string>> $matches */
    protected static function parseTitleMatches(array $matches, string $releaseTitle): ?ParsedIssueInfo
    {
        $comicTitle = $matches[0]['title'];
        $comicTitle = str_replace([".", "_"], " ", $comicTitle);
        $comicTitle = preg_replace(Patterns::$requestInfoRegex, "", $comicTitle);
        $comicTitle = rtrim($comicTitle, " ");

        $releaseYear = $matches[0]['releaseyear'] ?? null;

        $result = new ParsedIssueInfo();
        $result->releaseTitle = $releaseTitle;
        $result->comicTitle = $comicTitle;
        $result->comicTitleInfo = self::getComicTitleInfo($comicTitle);

        if ($releaseYear && is_numeric($releaseYear)) {
            //$result->releaseYear = $releaseYear;
        }

        foreach($matches as $matchGroup) {
            $issueNumber = $matchGroup['issue'] ?? null;

            if ($issueNumber) {
                $lastIssueNumber = $matchGroup['lastIssue'] ?? $issueNumber;
                
                if ($issueNumber > $lastIssueNumber) {
                    return null;
                }

                $result->issueNumbers = range($issueNumber, $lastIssueNumber);
            }
        }

        return $result;
    }

    protected static function getComicTitleInfo(string $title): ComicTitleInfo
    {
        $comicTitleInfo = new ComicTitleInfo();
        $comicTitleInfo->title = $title;

        preg_match_all(Patterns::$yearInTitleRegex, $title, $match, PREG_SET_ORDER);

        if (empty($match)) {
            $comicTitleInfo->titleWithoutYear = $title;
        } else {
            $comicTitleInfo->titleWithoutYear = $match[0]['title'];
            $comicTitleInfo->year = (int)$match[0]['year'];
        }

        return $comicTitleInfo;
    }

    protected static function parseFileType(string $title): ?string
    {
        preg_match(Patterns::$parseFileTypeRegex, $title, $matches);

        if (!empty($matches)) {
            return $matches['type'];
        }

        return null;
    }

    protected static function parseReleaseGroup(string $title): ?string
    {
        $title = trim($title);
        preg_match(Patterns::$releaseGroupRegex, $title, $matches);

        if (!empty($matches)) {
            $releaseGroup = $matches['releasegroup'];

            if (is_numeric($releaseGroup)) {
                return null;
            }

            if (preg_match(Patterns::$invalidReleaseGroupRegex, $releaseGroup)) {
                return null;
            }
            
            return $releaseGroup;
        }

        return null;
    }

    public static function parsePath(string $path): ?ParsedIssueInfo
    {
        $fileInfo = pathinfo($path);
        
        if (!isset($fileInfo['extension'])) {
            throw new Exception("Path is not a valid file: ". $path);
        }

        $parentDir = dirname($fileInfo['dirname']);
        $currentDir = substr($fileInfo['dirname'], strlen($parentDir));

        $result = self::parseTitle($fileInfo['filename']);

        if ($result == null) {
            //TODO: Log
            $result = self::parseTitle($currentDir . " " . $fileInfo['filename']);
        }

        if ($result == null) {
            //TODO: Log
            $result = self::parseTitle($currentDir . $fileInfo['extension']);
        }

        return $result;
    }
}
