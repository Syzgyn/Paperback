<?php

namespace App\Libraries\MediaFiles\IssueImport\Manual;

class ManualImportFile
{
    public ?string $path = null;
    public ?string $folderName = null;
    public ?int $comicId = null;
    public array $issueIds = [];
    public ?string $downloadId = null;

    public function equals(?ManualImportFile $other)
    {
        if ($other == null) {
            return false;
        }

        return $this->path == $other->path;
    }

    public static function fromArray(array $params): self
    {
        $file = new self();
        $file->comicId = $params['comicId'] ?? null;
        $file->downloadId = $params['downloadId'] ?? null;
        $file->folderName = $params['folderName'] ?? null;
        $file->path = $params['path'] ?? null;
        $file->issueIds = $params['issueIds'] ?? [];

        return $file;
    }
}