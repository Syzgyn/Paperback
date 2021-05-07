<?php

namespace App\Libraries\IndexerSearch;

use App\Models\Issue;
use App\Models\Indexer;
use Generator;

class SearchService
{
    public function issueIdSearch(int $issueId, bool $userInvokedSearch, bool $interactiveSearch)
    {
        $issue = Issue::with('comic')->findOrFail($issueId);

        return $this->issueSearch($issue, $userInvokedSearch, $interactiveSearch);
    }

    public function issueSearch(Issue $issue, bool $userInvokedSearch, bool $interactiveSearch)
    {
        $searchCriteria = new SingleIssueSearchCriteria();
        $searchCriteria->comic = $issue->comic;
        $searchCriteria->issues = [$issue];
        $searchCriteria->monitoredEpisodesOnly = false;
        $searchCriteria->userInvokedSearch = $userInvokedSearch;
        $searchCriteria->interactiveSearch = $interactiveSearch;
        $searchCriteria->issueNumber = $issue->issue_num;

        $decisions = $this->dispatch(fn($indexer) => $indexer->fetch($searchCriteria), $searchCriteria);

        return $this->filterUniqueDecisions($decisions);
    }

    protected function dispatch(callable $searchAction, SearchCriteriaBase $searchCriteria): Generator 
    {
        $indexers = $searchCriteria->interactiveSearch ? 
            Indexer::where('enable_interactive_search', true)->get() :
            Indexer::where('enable_automatic_search', true)->get();

        $reports = [];

        foreach ($indexers as $indexer) {
            $reports += $searchAction($indexer);
        }

        return resolve('DecisionService')->getSearchDecision($reports, $searchCriteria);
    }

    protected function filterUniqueDecisions(Generator $decisions): array
    {
        return array_filter(iterator_to_array($decisions), function($decision) {
            static $existingList = [];
            if (in_array($decision->remoteIssue->release->guid, $existingList)) {
                return false;
            }
            $existingList[] = $decision->remoteIssue->release->guid;
            return true;
        });
    }
}

