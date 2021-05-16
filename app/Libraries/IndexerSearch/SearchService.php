<?php

namespace App\Libraries\IndexerSearch;

use App\Libraries\DecisionEngine\DecisionService;
use App\Libraries\DecisionEngine\DownloadDecision;
use App\Libraries\Indexers\IndexerModelBase;
use App\Libraries\Parser\ReleaseInfo;
use App\Models\Comic;
use App\Models\Issue;
use App\Models\Indexer;
use Generator;

class SearchService
{
    /** @return DownloadDecision[] */
    public function issueIdSearch(int $issueId, bool $userInvokedSearch, bool $interactiveSearch): array
    {
        /** @var Issue */
        $issue = Issue::with('comic')->findOrFail($issueId);

        return $this->issueSearch($issue, $userInvokedSearch, $interactiveSearch);
    }

    /** @return DownloadDecision[] */
    public function issueSearch(Issue $issue, bool $userInvokedSearch, bool $interactiveSearch): array
    {
        $searchCriteria = new SingleIssueSearchCriteria();
        /** @var Comic */
        $searchCriteria->comic = $issue->comic;
        $searchCriteria->issues = [$issue];
        $searchCriteria->monitoredEpisodesOnly = false;
        $searchCriteria->userInvokedSearch = $userInvokedSearch;
        $searchCriteria->interactiveSearch = $interactiveSearch;
        $searchCriteria->issueNumber = $issue->issue_num;

        $decisions = $this->dispatch(fn(IndexerModelBase $indexer) => $indexer->fetch($searchCriteria), $searchCriteria);

        return $this->filterUniqueDecisions($decisions);
    }

    /** @psalm-suppress UndefinedMagicMethod */
    protected function dispatch(callable $searchAction, SearchCriteriaBase $searchCriteria): Generator 
    {
        /** @var Indexer[] */
        $indexers = $searchCriteria->interactiveSearch ? 
            /** @psalm-suppress UndefinedMagicMethod */
            Indexer::where('enable_interactive_search', true)->get() :
            Indexer::where('enable_automatic_search', true)->get();

        $reports = [];

        foreach ($indexers as $indexer) {
            /** @var callable(Indexer): ReleaseInfo[] $searchAction */
            $reports += $searchAction($indexer);
        }
        /** @var DecisionService */
        $decisionService = resolve('DecisionService');
        
        /** @var ReleaseInfo[] $reports */
        return $decisionService->getSearchDecision($reports, $searchCriteria);
    }

    /** @return DownloadDecision[] */
    protected function filterUniqueDecisions(Generator $decisions): array
    {
        /** @var DownloadDecision[] */
        return array_filter(iterator_to_array($decisions), function(DownloadDecision $decision) {
            /** @var string[] */
            static $existingList = [];

            /** 
             * @var DownloadDecision $decision 
             * @var ReleaseInfo $decision->remoteIssue->release
            */
            if (in_array($decision->remoteIssue->release->guid, $existingList)) {
                return false;
            }
            $existingList[] = $decision->remoteIssue->release->guid;
            return true;
        });
    }
}

