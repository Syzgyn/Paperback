<?php

namespace App\Http\Controllers;

use App\Exceptions\DownloadClientRejectedReleaseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Libraries\DecisionEngine\DownloadDecision;
use App\Libraries\Indexers\ReleaseResource;
use App\Models\Issue;
use App\Models\Comic;
use Exception;
use App\Exceptions\ReleaseDownloadException;
use App\Exceptions\ReleaseUnavailableException;
use App\Libraries\DecisionEngine\DecisionService;
use App\Libraries\Download\DownloadService;
use App\Libraries\IndexerSearch\SearchService;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Libraries\Parser\ParserService;
use App\Libraries\Parser\RemoteIssue;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use InvalidArgumentException;

class ReleaseController extends Controller
{
    /**
     * @param Request $request 
     * @return array 
     * @throws BindingResolutionException 
     * @throws ModelNotFoundException 
     */
    public function get(Request $request): array
    {
        $issueId = (int)$request->query('issueId');

        if (!$issueId) {
            //return $this->getRss();
        }

        return $this->getEpisodeReleases($issueId);
    }

    /**
     * @param Request $request 
     * @return JsonResponse 
     * @throws Exception 
     * @throws InvalidArgumentException 
     * @throws BindingResolutionException 
     * @throws ReleaseUnavailableException 
     * @throws DownloadClientRejectedReleaseException 
     */
    public function download(Request $request)
    {
        /** @psalm-var ParserService */
        $parserService = resolve('ParserService');
        
        $release = ReleaseResource::fromRequest($request);

        /** @psalm-var RemoteIssue|null $remoteIssue */
        $remoteIssue = Cache::get($this->getCacheKey($release));

        if ($remoteIssue == null) {
            throw new \Exception("Couldn't find requested release in cache, try searching again");
        }

        try {
            if ($remoteIssue->comic == null) {
                if (isset($release->issueId)) {
                    /** @var Issue */
                    $issue = Issue::with('comic')->findOrFail($release->issueId);
                    $remoteIssue->comic = $issue->comic;
                    $remoteIssue->issues = [$issue];
                } elseif (isset($release->comicId)) {
                    /** @psalm-var Comic */
                    $comic = Comic::find($release->comicId);
                    /** @psalm-var Issue[] 
                     *  @psalm-var ParsedIssueInfo $remoteIssue->parsedIssueInfo */
                    $issues = $parserService->map($remoteIssue->parsedIssueInfo, null, $comic);

                    if (empty($issues)) {
                        throw new Exception("Unable to parse issues in the release");
                    }

                    $remoteIssue->comic = $comic;
                    $remoteIssue->issues = $issues;
                } else {
                    throw new Exception("Unable to find matching comic and issues");
                }
            } elseif (empty($remoteIssue->issues)) {
                /**  @psalm-var ParsedIssueInfo $remoteIssue->parsedIssueInfo */
                $issues = $parserService->map($remoteIssue->parsedIssueInfo, null, $remoteIssue->comic)->issues;

                if (empty($issues) && isset($release->issueId)) {
                    /** @psalm-var Issue */
                    $issue = Issue::find($release->issueId);
                    $issues = [$issue];
                }
                
                $remoteIssue->issues = $issues;

            }

            if (empty($remoteIssue->issues)) {
                throw new Exception("Unable to parse issues in the release");
            }

            /** @psalm-var DownloadService */
            $downloadService = resolve('DownloadService');
            $downloadService->downloadReport($remoteIssue);
        } catch (ReleaseDownloadException $e) {
            throw new \Exception("Getting release from indexer failed");
        }

        /** @var JsonResponse */
        return response()->json($release);
    }

    protected function getEpisodeReleases(int $issueId): array
    {
        /** @var SearchService $searchService */
        $searchService = resolve('SearchService');

        /** @var DecisionService $decisionService */
        $decisionService = resolve('DecisionService');

        $decisions = $searchService->issueIdSearch($issueId, true, true);
        $prioritizedDecisions = $decisionService->prioritizeDecisions($decisions);

        return $this->mapDecisions($prioritizedDecisions);
    }

    //TODO
    protected function getRss(): void
    {
    }

    /** @param DownloadDecision[] $decisions */
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
        assert($resource->indexerId != null && $resource->guid != null);
        return sprintf("release_%s_%s", $resource->indexerId, $resource->guid);
    }
}
