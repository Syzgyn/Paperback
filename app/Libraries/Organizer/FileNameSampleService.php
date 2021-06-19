<?php

namespace App\Libraries\Organizer;

use App\Models\Comic;
use App\Models\Issue;
use App\Models\IssueFile;
use Exception;

class FileNameSampleService
{
    protected Comic $comic;
    protected Issue $issueOne;
    protected Issue $issueTwo;
    protected Issue $issueThree;
    /** @var Issue[] */
    protected array $singleIssue;
    /** @var Issue[] */
    protected array $multiIssues;
    protected IssueFile $singleIssueFile;
    protected IssueFile $multiIssueFile;

    public function __construct()
    {
        $this->comic = new Comic([
            'title' => 'The Comic Title!',
            'year' => 2020,
            'cvid' => 12345,
        ]);

        $this->issueOne = new Issue([
            'issue_num' => 1,
            'title' => 'Issue Title (1)',
            'store_date' => '2020-04-01',
            'cover_date' => '2020-04-17',
        ]);

        $this->issueTwo = new Issue([
            'issue_num' => 2,
            'title' => 'Issue Title (2)',
        ]);

        $this->issueThree = new Issue([
            'issue_num' => 3,
            'title' => 'Issue Title (3)',
        ]);

        $this->singleIssue = [$this->issueOne];
        $this->multiIssues = [$this->issueOne, $this->issueTwo, $this->issueThree];

        $this->singleIssueFile = new IssueFile([
            'relative_path' => 'Comic.Title.001.ZONE.cbr',
        ]);

        $this->multiIssueFile = new IssueFile([
            'relative_path' => 'Comic.Title.001-003.ZONE.cbr',
        ]);
    }

    public function getStandardSample(?array $namingConfig): SampleResult
    {
        return new SampleResult(
            $this->buildSample($this->singleIssue, $this->comic, $this->singleIssueFile, $namingConfig),
            $this->comic,
            $this->singleIssue,
            $this->singleIssueFile
        );
    }

    public function getMultiIssueSample(?array $namingConfig): SampleResult
    {
        return new SampleResult(
            $this->buildSample($this->multiIssues, $this->comic, $this->multiIssueFile, $namingConfig),
            $this->comic,
            $this->multiIssues,
            $this->multiIssueFile
        );
    }

    public function getComicFolderSample(?array $namingConfig): string
    {
        return FileNameBuilder::getComicFolder($this->comic, $namingConfig);
    }

    /** @param Issue[] $issues */
    protected function buildSample(array $issues, Comic $comic, IssueFile $issueFile, ?array $namingConfig): string
    {
        try {
            return FileNameBuilder::buildFileName($issues, $comic, $issueFile, namingConfig: $namingConfig);
        } catch (Exception $e) {
            return "";
        }
    }
}