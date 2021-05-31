<?php

namespace App\Libraries\History;

class IssueHistoryEventType
{
    public const UNKNOWN = 0;
    public const GRABBED = 1;
    public const COMIC_FOLDER_IMPORTED = 2;
    public const DOWNLOAD_FOLDER_IMPORTED = 3;
    public const DOWNLOAD_FAILED = 4;
    public const ISSUE_FILE_DELETED = 5;
    public const ISSUE_FILE_RENAMED = 6;
    public const DOWNLOAD_IGNORED = 7;

    public static function toString(int $i): string
    {
        switch ($i) {
            case self::GRABBED:
                return "grabbed";
            case self::COMIC_FOLDER_IMPORTED:
                return "comicFolderImported";
            case self::DOWNLOAD_FOLDER_IMPORTED:
                return "downloadFolderImported";
            case self::DOWNLOAD_FAILED:
                return "downloadFailed";
            case self::ISSUE_FILE_DELETED:
                return "issueFileDeleted";
            case self::ISSUE_FILE_RENAMED:
                return "issueFileRenamed";
            case self::DOWNLOAD_IGNORED:
                return "downloadIgnored";
            default:
                return "unknown";
        }
    }
}