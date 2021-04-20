<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Http\Resources\IssueCollection;
use Illuminate\Http\Request;

class WantedController extends Controller
{
    public function missing(Request $request)
    {
        $page = $request->query('page', 1);
        $pageSize = $request->query('pageSize', 20);
        $sortDirection = $request->query('sortDirection', 'descending');
        $sortKey = $request->query('sortKey', 'coverDate');
        $monitored = $request->query('monitored', 'true');

        $querySortDirection = $sortDirection === 'ascending' ? 'asc' : 'desc';
        $offset = max(0, $page - 1) * $pageSize;
        $monitored = $monitored === 'true' ? 1 : 0;

        $total = Issue::where('monitored', $monitored)->count();
        $issues = Issue::join('comics', 'issues.comic_id', '=', 'comics.cvid')
            ->select('issues.*')
            ->where('issues.monitored', $monitored)
            ->orderBy($sortKey, $querySortDirection)
            ->limit($pageSize)
            ->offset($offset)
            ->get();
        $records = new IssueCollection($issues);

        return response()->json([
            'page' => (int)$page,
            'pageSize' => (int)$pageSize,
            'sortKey' => $sortKey,
            'sortDirection' => $sortDirection,
            'totalRecords' => (int)$total,
            'records' => $records,
        ]);
    }
}
