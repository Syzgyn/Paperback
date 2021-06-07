<?php

namespace App\Libraries\MediaFiles\IssueImport;

class ImportResult
{
    /** @param string[] $errors */
    public function __construct(
        public ImportDecision $importDecision,
        public array $errors = [],
    ) {}

    /** @return ImportResultType::* */
    public function result(): int
    {
        if (!empty($this->errors)) {
            if ($this->importDecision->isApproved()) {
                return ImportResultType::SKIPPED;
            }

            return ImportResultType::REJECTED;
        }

        return ImportResultType::IMPORTED;
    }
}