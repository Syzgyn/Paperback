<?php

namespace App\Libraries\MediaFiles\IssueImport;

use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\MediaFiles\IssueImport\Specifications\AlreadyImportedSpecification;
use App\Libraries\MediaFiles\IssueImport\Specifications\FreeSpaceSpecification;
use App\Libraries\Parser\LocalIssue;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Libraries\Parser\Parser;
use App\Models\Comic;
use App\Models\IssueFile;
use Exception;
use Illuminate\Support\Facades\Log;

class ImportDecisionMakerService
{
    /** @var ImportDecisionSpecificationInterface[] */
    protected array $specifications = [];

    public function __construct()
    {
        $this->specifications[] = new AlreadyImportedSpecification();
        $this->specifications[] = new FreeSpaceSpecification();
    }

    /**
     *  @param string[] $issueFiles
     * 
     *  @return ImportDecision[] 
     */
    public function getImportDecisions(
        array $issueFiles,
        Comic $comic,
        ?DownloadClientItem $downloadClientItem = null,
        ?ParsedIssueInfo $parsedIssueInfo = null,
        bool $filterExistingFiles = false,
    ): array
    {
        $newFiles = $filterExistingFiles ? IssueFile::filterExistingFiles($issueFiles, $comic) : $issueFiles;

        Log::debug(sprintf("Analyzing %d/%d files", count($newFiles), count($issueFiles)));

        $downloadClientItemInfo = $downloadClientItem ? Parser::parseTitle($downloadClientItem->title ?? "") : null;
        /** @var ImportDecision[] */
        $decisions = [];

        foreach ($newFiles as $file) {
            $localIssue = new LocalIssue();
            $localIssue->comic = $comic;
            $localIssue->downloadClientIssueInfo = $downloadClientItemInfo;
            $localIssue->folderIssueInfo = $parsedIssueInfo;
            $localIssue->path = $file;
            $localIssue->existingFile = $this->isParentPath($comic->path, $file);

            $decisions[] = $this->getDecision($localIssue, $downloadClientItem);
        }

        /** @var ImportDecision[] */
        return $decisions;
    }

    public function getDecision(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): ImportDecision
    {
        $reasons = [];

        foreach ($this->specifications as $spec) {
            $reason = $this->evaluateSpec($spec, $localIssue, $downloadClientItem);

            if ($reason) {
                $reasons[] = $reason;
            }
        }

        return new ImportDecision($localIssue, $reasons);
    }

    public function getDecisionFromFiles(LocalIssue $localIssue, DownloadClientItem $downloadClientItem): ?ImportDecision
    {
        $decision = null;

        $fileIssueInfo = Parser::parsePath($localIssue->path ?? "");
        $localIssue->fileIssueInfo = $fileIssueInfo;
        $localIssue->size = filesize($localIssue->path ?? "");

        try {
            /** @var LocalIssue */
            $localIssue = resolve("AggregationService")->augment($localIssue, $downloadClientItem);

            if (empty($localIssue->issues)) {
                $decision = new ImportDecision($localIssue, [new Rejection("Invalid issue")]);
            } else {
                $decision = $this->getDecision($localIssue, $downloadClientItem);
            }
        } catch (Exception $e) {
            Log::error("Couldn't import file: " . ($localIssue->path ?? "Unknown path"), ['exception' => $e]);
            $decision = new ImportDecision($localIssue, [new Rejection("Unable to parse file")]);
        }

        if (!empty($decision->rejections)) {
            Log::debug("File rejected for the following reasons: " . implode(",", $decision->rejections));
        } else {
            Log::debug("File accepted");
        }

        return $decision;
    }

    protected function isParentPath(string $parentPath, string $childPath): bool
    {
        if ($parentPath != '/' && !str_ends_with($parentPath, ":\\")) {
            $parentPath = rtrim($parentPath, DIRECTORY_SEPARATOR);
        }
        
        if ($childPath != '/' && !str_ends_with($childPath, ":\\")) {
            $childPath = rtrim($childPath, DIRECTORY_SEPARATOR);
        }

        //TODO: Implement for windows
        while (dirname($childPath) != "/" && dirname($childPath) != ".") {
            if (dirname($childPath) == $parentPath) {
                return true;
            }

            $childPath = dirname($childPath);
        }

        return false;
    }

    protected function evaluateSpec(ImportDecisionSpecificationInterface $spec, LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): ?Rejection
    {
        try {
            $result = $spec->isSatisfiedBy($localIssue, $downloadClientItem);

            if (!$result->accepted) {
                return new Rejection($result->reason);
            }
        } catch (Exception $e) {
            Log::error("Couldn't evaluate decision on: " . ($localIssue->path ?? "Unknown Path"), ['exception' => $e]);
            return new Rejection(basename($spec::class) . ": " . $e->getMessage());
        }

        return null;
    }
}