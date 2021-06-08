<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = (int) $request->input("page", 1);
        $pageSize = (int) $request->input("pageSize", 20);
        $sortDirection = (string) $request->input("sortDirection", "desc") == "ascending" ? "asc" : "desc";
        $sortKey = (string) $request->input("sortKey", "date");


        $levelFilter = (string) $request->input("level");
        $levels = [];

        switch ($levelFilter) {
            case "emergency":
                $levels = ["EMERGENCY"];
                break;
            case "alert":
                $levels = ["EMERGENCY", "ALERT"];
                break;
            case "critical":
                $levels = ["EMERGENCY", "ALERT", "CRITICAL"];
                break;
            case "error":
                $levels = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR"];
                break;
            case "warning":
                $levels = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING"];
                break;
            case "notice":
                $levels = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE"];
                break;
            case "info":
                $levels = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE", "INFO"];
                break;
        }

        $query = Log::query();

        $query->when($levelFilter != null, function(Builder $q) use ($levels) {
            return $q->whereIn("level", $levels);
        });

        $count = $query->count();

        $results = $query->orderBy($sortKey, $sortDirection)
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        return response()->json([
            "page" => $page,
            "pageSize" => $pageSize,
            "sortKey" => $sortKey,
            "sortDirection" => $sortDirection,
            "totalRecords" => $count,
            "records" => $results->all(),
        ]);
    }
}