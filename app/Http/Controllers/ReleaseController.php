<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Libraries\DecisionEngine\DownloadDecision;
use App\Libraries\Indexers\ReleaseResource;
use Exception;

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
        $release = ReleaseResource::fromRequest($request);
        $remoteIssue = Cache::get($this->getCacheKey($release));

        if ($remoteIssue == null) {
            throw new \Exception("Couldn't find requested release in cache, try searching again");
        }

        try {
            if ($remoteIssue->comic == null) {
                if (isset($release->issueId)) {
                    $issue = Issue::with('comic')->find($release->issueId);
                    $remoteIssue->comic = $issue->comic;
                    $remoteIssue->issues = [$issue];
                } elseif (isset($release->comicId)) {
                    $comic = Comic::find($release->comicId);
                    $issues = resolve('ParserService')->map($remoteIssue->parsedIssueInfo, null, $comic);

                    if (empty($issues)) {
                        throw new Exception("Unable to parse issues in the release");
                    }

                    $remoteIssue->comic = $comic;
                    $remoteIssue->issues = $issues;
                } else {
                    throw new Exception("Unable to find matching comic and issues");
                }
            } elseif (empty($remoteIssue->issues)) {
                $issues = resolve('ParserService')->map($remoteIssue->parsedIssueInfo, null, $comic);

                if (empty($issues) && isset($release->issueId)) {
                    $issue = Issue::find($release->issueId);
                    $issues = [$issue];
                }
                
                $remoteIssue->issues = $issues;

            }

            if (empty($remoteIssue->issues)) {
                throw new Exception("Unable to parse issues in the release");
            }

            resolve('DownloadService')->downloadReport($remoteIssue);
        } catch (ReleaseDownloadException $e) {
            throw new \Exception("Getting release from indexer failed");
        }

        return response()->json($release);
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

        Cache::put($this->getCacheKey($release), $decision->remoteIssue, 1800);

        return $release;
    }

    protected function getCacheKey(ReleaseResource $resource): string
    {
        return sprintf("release_%s_%s", $resource->indexerId, $resource->guid);
    }
}
