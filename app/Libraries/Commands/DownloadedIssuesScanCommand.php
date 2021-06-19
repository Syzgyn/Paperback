<?php

namespace App\Libraries\Commands;

use App\Libraries\MediaFiles\IssueImport\ImportMode;

class DownloadedIssuesScanCommand extends Command
{
    public ?string $path = null;
    public ?string $downloadClientId = null;
    /** @var ImportMode::* */
    public ?int $importMode = null;

    protected function setValues(array $params): void
    {
        /** @var ?string */
        $this->path = $params['path'] ?? null;
        /** @var ?string */
        $this->downloadClientId = $params['downloadClientId'] ?? null;
        $this->importMode = ImportMode::fromString((string) ($params['importMode'] ?? null));
    }
}