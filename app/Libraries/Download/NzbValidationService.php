<?php

namespace App\Libraries\Download;

use Exception;

class NzbValidationService
{
    public function validate(string $filename, string $fileContent): void
    {
        $nzb = simplexml_load_string($fileContent);
        
        if ($nzb === false) {
            throw new Exception("Invalid NZB [$filename]");
        }

        if ($nzb->getName() == "error" &&
            isset($nzb['code']) &&
            isset($nzb['description'])
        ) {
            throw new Exception(sprintf("Invalid NZB: Contains indexer error: %s - %s", $nzb['code'], $nzb['description']));
        }

        if ($nzb->getName() !== "nzb") {
            throw new Exception(sprintf("Invalid NZB: Unexpected root element. Expected 'nzb' found '%s' [%s]", $nzb->getName(), $filename));
        }

        $files = $nzb->file;

        if (empty($files)) {
            throw new Exception("Invalid NZB: No files [$filename]");
        }
    }
}
