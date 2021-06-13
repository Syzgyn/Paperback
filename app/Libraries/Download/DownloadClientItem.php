<?php

namespace App\Libraries\Download;

use App\Libraries\Disk\OsPath;

class DownloadClientItem
{
    public ?DownloadClientItemClientInfo $downloadClientInfo = null;
    public ?string $downloadId = null;
    public ?string $category = null;
    public ?string $title = null;
    public ?int $totalSize = null;
    public ?int $remainingSize = null;
    public ?int $remainingTime = null;
    public ?float $seedRatio = null;
    public ?OsPath $outputPath = null;
    public ?string $message = null;
    public ?int $status = null;
    public ?bool $isEncrypted = null;
    public ?bool $canMoveFiles = null;
    public ?bool $canBeRemoved = null;
    public ?bool $removed = null;

    public function __clone()
    {
        if (!empty($this->downloadClientInfo)) {
            $this->downloadClientInfo = clone $this->downloadClientInfo;
        }

        if (!empty($this->outputPath)) {
            $this->outputPath = clone $this->outputPath;
        }
    }
}
