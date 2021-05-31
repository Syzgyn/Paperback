<?php

namespace App\Http\Controllers;

use App\Http\Resources\IssueHistoryCollection;
use App\Http\Resources\IssueHistoryResource;
use App\Libraries\History\IssueHistory;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use DateTime;

class HistoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = (int) $request->input("page", 1);
        $pageSize = (int) $request->input("pageSize", 20);
        $sortDirection = (string) $request->input("sortDirection", "desc") == "ascending" ? "asc" : "desc";
        $sortKey = (string) $request->input("sortKey", "date");

        $includeComic = (bool) $request->input("includeComic", false);
        $includeIssue = (bool) $request->input("includeIssue", false);

        $eventTypeFilter = (int) $request->input("eventType");
        $issueIdFilter = (int) $request->input("issueId");
        $downloadIdFilter = (int) $request->input("downloadId");

        $query = IssueHistory::query();
        $query->when($includeComic, function(Builder $q) {
            return $q->with("comic");
        });

        $query->when($includeIssue, function(Builder $q) {
            return $q->with("issue");
        });

        $query->when($eventTypeFilter > 0, function(Builder $q) use ($eventTypeFilter) {
            return $q->where("event_type", $eventTypeFilter);
        });

        $query->when($issueIdFilter > 0, function(Builder $q) use ($issueIdFilter) {
            return $q->where("issue_id", $issueIdFilter);
        });
        
        $query->when($downloadIdFilter > 0, function(Builder $q) use ($downloadIdFilter) {
            return $q->where("download_id", $downloadIdFilter);
        });

        $count = $query->count();

        $results = $query->orderBy($sortKey, $sortDirection)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $collection = new IssueHistoryCollection($results);

        return response()->json([
            "page" => $page,
            "pageSize" => $pageSize,
            "sortKey" => $sortKey,
            "sortDirection" => $sortDirection,
            "totalRecords" => $count,
            "records" => $collection->all(),
        ]);
        return response()->json($results);
    }

    public function getHistorySince(Request $request): IssueHistoryCollection
    {
        $date = (string) $request->input('date');
        /** @var ?mixed */
        $eventType = $request->input('eventType');

        $includeComic = (bool) $request->input("includeComic", false);
        $includeIssue = (bool) $request->input("includeIssue", false);

        if (!$date) {
            throw new Exception("Bad request");
        }

        if ($eventType != null) {
            $eventType = (int) $eventType;
        }

        $datetime = new DateTime($date);

        /** @var int $eventType */
        $results = IssueHistory::since($datetime, $eventType, $includeComic, $includeIssue);
        return new IssueHistoryCollection($results);
    }

    public function getComicHistory(Request $request): IssueHistoryCollection
    {
        $comicId = (int) $request->input("comicId");
        /** @var ?mixed */
        $eventType = $request->input('eventType');

        $includeComic = (bool) $request->input("includeComic", false);
        $includeIssue = (bool) $request->input("includeIssue", false);

        if (!$comicId) {
            throw new Exception("Bad request");
        }

        if ($eventType != null) {
            $eventType = (int) $eventType;
        }

        /** @var int $eventType */
        $results = IssueHistory::findByComic($comicId, $eventType);
        return new IssueHistoryCollection($results);
    }

    public function markAsFailed(Request $request, int $id): JsonResponse
    {
        resolve("FailedDownloadService")->markHistoryAsFailed($id);
        return response()->json();
    }
}