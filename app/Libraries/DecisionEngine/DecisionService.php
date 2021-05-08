<?php

namespace App\Libraries\DecisionEngine;

use App\Libraries\IndexerSearch\SearchCriteriaBase;
use Generator;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Libraries\Parser\Parser;

class DecisionService
{
    public function getRssDecision(array $reports)
    {
        return $this->getSearchDecision($reports);
    }

    public function getSearchDecision(array $reports, ?SearchCriteriaBase $searchCriteria = null): ?Generator 
    {
        //TODO: Logging
        $parser = resolve('ParserService');

        foreach($reports as $report) {
            $decision = null;

            try {
                $parsedIssueInfo = Parser::parseTitle($report->title);

                if ($parsedIssueInfo && $parsedIssueInfo->comicTitle) {
                    $remoteIssue = $parser->map($parsedIssueInfo, $searchCriteria);
                    $remoteIssue->release = $report;

                    if ($remoteIssue->comic == null) {
                        $decision = new DownloadDecision($remoteIssue, new Rejection("Unknown Series"));
                    } elseif (empty($remoteIssue->issues)) {
                        $decision = new DownloadDecision($remoteIssue, new Rejection("Unable to identify correct issue(s) using release name"));
                    } else {
                        $remoteIssue->downloadAllowed = !empty($remoteIssue->issues);
                        $decision = $this->getDecisionForReport($remoteIssue, $searchCriteria);
                    }
                }

                if ($searchCriteria) {
                    if ($parsedIssueInfo == null) {
                        $parsedIssueInfo = new ParsedIssueInfo();
                    }

                    if (!$parsedIssueInfo->comicTitle) {
                        $remoteIssue = new RemoteIssue();
                        $remoteIssue->release = $report;
                        $remoteIssue->parsedIssueInfo = $parsedIssueInfo;

                        $decision = new DownloadDecision($remoteIssue, new Rejection("Unable to parse release"));
                    }
                }
            } catch (\Exception $e) {
            dd($e);
                $remoteIssue = new RemoteIssue();
                $remoteIssue->release = $report;
                $decision = new DownloadDecision($remoteIssue, new Rejection("Unexpected error processing release"));
            }

            if ($decision != null) {
                yield $decision;
            }
        }
    }

    protected function getDecisionForReport(RemoteIssue $remoteIssue, ?SearchCriteriaBase $searchCriteria = null): DownloadDecision
    {
       //TODO: Run through specifications (TBA)
       return new DownloadDecision($remoteIssue, []);
    }

    public function prioritizeDecisions(array $decisions): array
    {
        //Start with only decisions with a set comic
        $filledDecisions = array_filter($decisions, fn($d) => isset($d->remoteIssue->comic));

        $comicDecisions = [];
        //Group them by the comic id
        foreach($filledDecisions as $decision) {
            $comicDecisions[$decision->remoteIssue->comic->id][] = $decision;
        }
        
        //For each unique comic id, sort the decisions
        foreach($comicDecisions as $comicId => $decisionArray) {
            usort($comicDecisions[$comicId], [DownloadDecisionComparer::class, 'compare']);
        }

        //Flatten back to a single dimensional array
        $sortedDecisions = [];
        array_walk_recursive($comicDecisions, function($v) use (&$sortedDecisions) { $sortedDecisions[] = $v; });

        //Add the null comic decisions to the end
        $sortedDecisions += array_filter($decisions, fn($d) => !isset($d->remoteIssue->comic));

        return $sortedDecisions;
    }
}
