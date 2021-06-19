<?php

namespace App\Libraries\Commands;

use App\Libraries\MediaFiles\IssueImport\ImportMode;
use App\Libraries\MediaFiles\IssueImport\Manual\ManualImportFile;

class ManualImportCommand extends Command
{
    /** @var ManualImportFile[] */
    public array $files = [];
    /** @var ImportMode::* */
    public ?int $importMode = null;

    protected function setValues(array $params): void
    {
        /** @var array $file */
        foreach ($params['files'] as $file) {
            $this->files[] = ManualImportFile::fromArray($file);
        }

        $this->importMode = ImportMode::fromString((string) $params['importMode']);
        $this->sendUpdatesToClient = true;
        $this->requiresDiskAccess = true;
    }
}