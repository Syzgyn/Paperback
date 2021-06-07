<?php

namespace App\Libraries\MediaFiles;

class DeleteIssueFileReason
{
    public const MISSING_FROM_DISK = 0;
    public const MANUAL = 1;
    public const UPGRADE = 2;
    public const NO_LINKED_ISSUES = 3;
    public const MANUAL_OVERRIDE = 4;
}