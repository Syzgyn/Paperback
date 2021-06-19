<?php

namespace App\Libraries\MediaFiles\IssueImport\Manual;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\MediaFiles\IssueImport\ImportResult;

class ManuallyImportedFile
{
    public ?TrackedDownload $trackedDownload = null;
    public ?ImportResult $importResult = null;
}