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
}