<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libraries\DecisionEngine\DownloadDecision;
use App\Libraries\Indexers\ReleaseResource;

class ReleaseController extends Controller
{
    public function get(Request $request)
    {
        $issueId = $request->query('issueId');

        if (!$issueId) {
            return $this->getRss();
        }

        return $this->getEpisodeReleases($issueId);
    }

    public function download(Request $request)
    {
    }

    protected function getEpisodeReleases(string $issueId)
    {
        $decisions = resolve('SearchService')->issueIdSearch($issueId, true, true);
        $prioritizedDecisions = resolve('DecisionService')->prioritizeDecisions($decisions);

        return $this->mapDecisions($prioritizedDecisions);
    }

    protected function getRss()
    {
    }

    protected function mapDecisions(array $decisions): array
    {
        $results = [];
        
        foreach ($decisions as $decision) {
            $results[] = $this->mapDecision($decision, count($results));
        }

        return $results;
    }

    protected function mapDecision(DownloadDecision $decision, int $initialWeight): ReleaseResource
    {
        $release = ReleaseResource::fromDownloadDecision($decision);
        $release->releaseWeight = $initialWeight;

        return $release;
    }
}
