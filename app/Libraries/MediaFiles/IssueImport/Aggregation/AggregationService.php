<?php

namespace App\Libraries\MediaFiles\IssueImport\Aggregation;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\MediaFiles\IssueFileExtensions;
use App\Libraries\Parser\LocalIssue;
use Exception;

class AggregationService
{
    /** @var AggregateInterface[] */
    protected array $augmenters = [];

    public function __construct()
    {
        $this->augmenters[] = new AggregateIssues();    
    }

    public function augment(LocalIssue $localIssue, DownloadClientItem $downloadClientItem): LocalIssue
    {
        if ($localIssue->path == null) {
            throw new Exception("Unable to parse issue with missing path.");
        }

        $isIssueFile = IssueFileExtensions::pathIsIssueFile($localIssue->path);

        if ($localIssue->downloadClientIssueInfo == null &&
            $localIssue->folderIssueInfo == null &&
            $localIssue->fileIssueInfo == null &&
            $isIssueFile
        )
        {
            throw new Exception("Unable to parse issue info from path: " . $localIssue->path);
        }

        $localIssue->size = filesize($localIssue->path);
        
        foreach ($this->augmenters as $augmenter) {
            try {
                $localIssue = $augmenter->aggregate($localIssue, $downloadClientItem);
            } catch (Exception $e) {
                //TODO: Log
            }
        }

        return $localIssue;
    }
}