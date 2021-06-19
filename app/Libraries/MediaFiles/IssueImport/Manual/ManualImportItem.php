<?php

namespace App\Libraries\MediaFiles\IssueImport\Manual;

use App\Libraries\DecisionEngine\Rejection;
use App\Models\Comic;
use App\Models\Issue;

class ManualImportItem
{
    public ?int $id = null;
    public ?string $path = null;
    public ?string $relativePath = null;
    public ?string $folderName = null;
    public ?string $name = null;
    public ?int $size = null;
    public ?Comic $comic = null;
    /** @var Issue[] */
    public array $issues = [];
    public ?string $downloadId = null;
    /** @var Rejection[] */
    public array $rejections = [];
}