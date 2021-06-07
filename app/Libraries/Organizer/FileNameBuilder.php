<?php

namespace App\Libraries\Organizer;

use App\Models\Comic;
use App\Models\Issue;
use App\Models\IssueFile;
use Exception;

class FileNameBuilder
{
    public const MAX_PATH_LENGTH = 4096;
    public const MAX_FILE_LENGTH = 255;

    protected static string $titleRegex = "/(?<escaped>\{\{|\}\})|\{(?<prefix>[- ._\[(]*)(?<token>(?:[a-z0-9]+)(?:(?<separator>[- ._]+)(?:[a-z0-9]+))?)(?::(?<customFormat>[a-z0-9+-]+(?<!-)))?(?<suffix>[- ._)\]]*)\}/i";
    protected static string $scenifyRemoveChars = "/(?<=\s)(,|<|>|\/|\\|;|:|'|\"\"|\||`|~|!|\?|@|$|%|^|\*|-|_|=){1}(?=\s)|('|:|\?|,)(?=(?:(?:s|m)\s)|\s|$)|(\(|\)|\[|\]|\{|\})/i";
    protected static string $scenifyReplaceChars = "/[\/]/i";
    protected static string $yearRegex = "/\(\d{4}\)$/i";
    protected static string $titlePrefixRegex = "/^(The|An|A) (.*?)((?: *\([^)]+\))*)$/i";
    protected static string $fileNameCleanupRegex = "/([- ._])(\1)+/";
    protected static string $trimSeparatorsRegex = "/[- ._]$/";

    /** @param Issue[] $issues */
    public static function buildFilePath(array $issues, Comic $comic, IssueFile $issueFile, string $extension): string
    {
        if (empty($extension)) {
            throw new Exception("Missing file extension");
        }

        $comicPath = $comic->path;
        $remainingPathLength = self::MAX_PATH_LENGTH - strlen($comicPath) - 1;
        $fileName = self::buildFileName($issues, $comic, $issueFile, $extension, $remainingPathLength);

        return $comicPath . DIRECTORY_SEPARATOR . $fileName;
    }

    /** @param Issue[] $issues */
    public static function buildFileName(array $issues, Comic $comic, IssueFile $issueFile, string $extension, int $maxPath): string
    {
        /** @var array */
        $namingConfig = resolve("AppSettings")->get("naming");

        if (!$namingConfig['renameIssues']) {
            return self::getOriginalFileName($issueFile);
        }

        if (empty($namingConfig['standardIssueFormat'])) {
            throw new Exception("Issue format cannot be empty");
        }

        /** @var string */
        $pattern = $namingConfig['standardIssueFormat'];

        usort($issues, fn(Issue $a, Issue $b) => $a->issue_num <=> $b->issue_num);

        $splitPatterns = preg_split('@[\\\/]@', $pattern);

        if ($splitPatterns === false) {
            throw new Exception("Issue format is invalid");
        }

        $components = [];

        for ($i = 0; $i < count($splitPatterns); $i++) {
            $splitPattern = $splitPatterns[$i];
            /** @var callable[] */
            $tokenHandlers = [];

            self::addComicTokens($tokenHandlers, $comic);
            self::addIdTokens($tokenHandlers, $comic);
            self::addIssueTokens($tokenHandlers, $issues);
            self::addIssueTitlePlaceholderTokens($tokenHandlers);
            self::addIssueFileTokens($tokenHandlers, $issueFile);

            $component = trim(self::replaceTokens($splitPattern, $tokenHandlers, $namingConfig, true));
            $maxPathSegmentLength = min(self::MAX_FILE_LENGTH, $maxPath);

            if ($i == count($splitPatterns) - 1) {
                $maxPathSegmentLength -= strlen($extension);
            }

            $maxIssueTitleLength = $maxPathSegmentLength - self::getLengthWithoutIssueTitle($component, $namingConfig);

            self::addIssueTitleTokens($tokenHandlers, $issues, $maxIssueTitleLength);
            $component = self::replaceTokens($component, $tokenHandlers, $namingConfig);

            $component = preg_replace_callback(self::$fileNameCleanupRegex, fn(array $match): string => (string) $match[1], $component);
            $component = preg_replace(self::$trimSeparatorsRegex, "", $component);
            $component = str_replace("{ellipsis}", "...", $component);

            $components[] = $component;
        }

        return implode(DIRECTORY_SEPARATOR, $components) . $extension;
    }

    protected static function getLengthWithoutIssueTitle(string $pattern, array $namingConfig): int
    {
        $tokenHandler = [];
        $tokenHandler["{Issue Title}"] = fn(TokenMatch $m): string => "";
        $tokenHandler["{Issue CleanTitle}"] = fn(TokenMatch $m): string => "";

        $result = self::replaceTokens($pattern, $tokenHandler, $namingConfig);

        return strlen($result);
    }

    protected static function getOriginalFileName(IssueFile $issueFile): string
    {
        if (!empty($issueFile->relative_path)) {
            return pathinfo($issueFile->relative_path,  PATHINFO_FILENAME);
        }

        return pathinfo($issueFile->path, PATHINFO_FILENAME);
    }

    protected static function addComicTokens(array &$tokenHandlers, Comic $comic): void
    {
        $tokenHandlers["{Comic Title}"] = fn(TokenMatch $m): string => $comic->title;
        $tokenHandlers["{Comic CleanTitle}"] = fn(TokenMatch $m): string => self::cleanTitle($comic->title);
        $tokenHandlers["{Comic CleanTitleYear}"] = fn(TokenMatch $m): string => self::cleanTitle(self::titleYear($comic->title, $comic->year ?? 0));
        $tokenHandlers["{Comic TitleThe}"] = fn(TokenMatch $m): string => self::titleThe($comic->title);
        $tokenHandlers["{Comic TitleYear}"] = fn(TokenMatch $m): string => self::titleYear($comic->title, $comic->year ?? 0);
        $tokenHandlers["{Comic TitleTheYear}"] = fn(TokenMatch $m): string => self::titleYear(self::titleThe($comic->title), $comic->year ?? 0);
        $tokenHandlers["{Comic TitleFirstCharacter}"] = fn(TokenMatch $m): string => strtoupper(substr(self::titleThe($comic->title), 0, 1));
        $tokenHandlers["{Comic Year}"] = fn(TokenMatch $m): string => (string) $comic->year;
    }

    protected static function addIdTokens(array &$tokenHandlers, Comic $comic): void
    {
        $tokenHandlers["{ComicvineId}"] = fn(TokenMatch $m): int => $comic->cvid;
    }

    protected static function addIssueTokens(array &$tokenHandlers, array $issues): void
    {
        /** @var Issue */
        $issue = array_shift($issues);
        $tokenHandlers["{Cover Date}"] = fn(TokenMatch $m): string => $issue->cover_date ?? "Unknown";
        $tokenHandlers["{Store Date}"] = fn(TokenMatch $m): string => $issue->store_date ?? "Unknown";
    }
    
    protected static function addIssueTitlePlaceholderTokens(array &$tokenHandlers): void
    {
        $tokenHandlers["{Issue Title}"] = fn(TokenMatch $m): null => null;
        $tokenHandlers["{Issue CleanTitle}"] = fn(TokenMatch $m): null => null;
    }

    protected static function addIssueTitleTokens(array &$tokenHandlers, array $issues, int $maxLength): void
    {
        $tokenHandlers["{Issue Title}"] = fn(TokenMatch $m): null => null;
        $tokenHandlers["{Issue CleanTitle}"] = fn(TokenMatch $m): null => null;
    }

    protected static function addIssueFileTokens(array &$tokenHandlers, IssueFile $issueFile): void
    {
        $tokenHandlers["{Original Title}"] = fn(TokenMatch $m): string => self::getOriginalFileName($issueFile);
        $tokenHandlers["{Original Filename}"] = fn(TokenMatch $m): string => self::getOriginalFileName($issueFile);
    }

    public static function cleanTitle(string $title): string
    {
        $title = str_replace("&", "and", $title);
        $title = preg_replace(self::$scenifyReplaceChars, " ", $title);
        $title = preg_replace(self::$scenifyRemoveChars, "", $title);

        return $title;
    }

    public static function titleThe(string $title): string
    {
        return preg_replace(self::$titlePrefixRegex, "$2, $1$3", $title);
    }

    public static function titleYear(string $title, int $year): string
    {
        if ($year == 0) {
            return $title;
        }

        if (preg_match(self::$yearRegex, $title)) {
            return $title;
        }

        return "$title ($year)";
    }

    /** 
     * @param Issue[] $issues
     * 
     * @return string[]
     */
    protected static function getIssueTitles(array $issues): array
    {
        return array_map(fn(Issue $i) => rtrim($i->title ?? "", " .?"), $issues);
    }

    /** @param string[] $titles */
    protected static function getIssueTitle(array $titles, string $separator, int $maxLength): string
    {
        $separator = sprintf(" %s ", trim($separator));

        $joined = implode($separator, $titles);

        if (strlen($joined) <= $maxLength) {
            return $joined;
        }

        $firstTitle = reset($titles);
        $firstTitleLength = strlen($firstTitle);

        if (count($titles) >= 2) {
            $lastTitle = end($titles);
            $lastTitleLength = strlen($lastTitle);
            
            if ($firstTitleLength + $lastTitleLength + 3 <= $maxLength) {
                return sprintf("%s{ellipsis}%s", rtrim($firstTitle, ". "), $lastTitle);
            }
        }

        if (count($titles) > 1 && $firstTitleLength + 3 <= $maxLength) {
            return sprintf("%s{ellipsis}", rtrim($firstTitle, ". "));
        }

        if (count($titles) == 1 && $firstTitleLength <= $maxLength) {
            return $firstTitle;
        }

        return sprintf("%s{ellipsis}", rtrim(substr($firstTitle, 0, $maxLength - 3), ". "));
    }

    protected static function replaceTokens(string $pattern, array $tokenHandlers, array $namingConfig, bool $escape = true): string
    {
        return preg_replace_callback(self::$titleRegex, fn(array $match) => self::replaceToken($match, $tokenHandlers, $namingConfig, $escape), $pattern);
    }

    protected static function replaceToken(array $match, array $tokenHandlers, array $namingConfig, bool $escape): string
    {
        if ($match['escaped']) {
            if ($escape) {
                return (string) $match[0];
            } else if ($match['escaped'] == "{{") {
                return "{";
            } else if ($match['escaped'] == "}}") {
                return "}";
            }
        }

        $tokenMatch = new TokenMatch(
            $match,
            (string) $match['prefix'],
            (string) $match['separator'],
            (string) $match['suffix'],
            (string) $match['token'],
            (string) $match['customFormat'],
        );

        if (empty($tokenMatch->customFormat)) {
            $tokenMatch->customFormat = null;
        }

        /** @var callable */
        $tokenHandler = $tokenHandlers[$tokenMatch->token] ?? fn(TokenMatch $m): string => "";
        /** @var string */
        $replacementText = $tokenHandler($tokenMatch);

        if ($replacementText == null) {
            return (string) $match[0];
        }

        $replacementText = trim($replacementText);

        if (strtoupper($tokenMatch->token) == $tokenMatch->token) {
            $replacementText = strtoupper($replacementText);
        } elseif (strtolower($tokenMatch->token) == $tokenMatch->token) {
            $replacementText = strtolower($replacementText);
        }

        if (!empty($tokenMatch->separator)) {
            $replacementText = str_replace($replacementText, " ", $tokenMatch->separator);
        }

        $replacementText = self::cleanFileName($replacementText, (bool) $namingConfig['replaceIllegalCharacters']);

        if (!empty($replacementText)) {
            $replacementText = $tokenMatch->prefix . $replacementText . $tokenMatch->suffix;
        }

        if ($escape) {
            $replacementText = str_replace($replacementText, ["{{", "}}"], ["{", "}"]);
        }

        /** @var string */
        return $replacementText;
    }

    public static function cleanFileName(string $name, bool $replace = true): string
    {
        $result = $name;
        $badChars =  ['\\', '/', '<', '>', '?', '*', ':', '|', '"'];
        $goodChars = ['+',  '+', '',  '',  '!', '-', '-', '',  ''];

        if ($replace) {
            $result = str_replace(": ", " - ", $result);
        }

        $result = str_replace($badChars, $goodChars, $result);

        return rtrim(ltrim($result, ' '), '. ');
    }
}