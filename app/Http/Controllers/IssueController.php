<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\IssueCollection;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Resources\Issue as IssueResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class IssueController extends Controller
{
    public function index(Request $request): IssueCollection
    {
        if ($comicId = $request->query('comicId')) {
            /** @var Collection */
            $issues = Issue::where('comic_id', $comicId)->orderBy('issue_num', 'DESC')->get();

            return new IssueCollection($issues);
        }

        $issues = Issue::all();

        return new IssueCollection($issues);
    }

    public function monitored(Request $request): IssueCollection
    {
        $ids = (array)$request->input('issueIds');
        $monitored = $request->boolean('monitored');

        Issue::whereIn('cvid', $ids)->update(['monitored' => $monitored]);

        return new IssueCollection(Issue::findMany($ids));
    }

    public function byComic(Request $request, Int $cvid): IssueCollection
    {
        $issues = Issue::where('comic_id', $cvid)->orderBy('issue_num', 'DESC')->get();

        return new IssueCollection($issues);
    }

    /*
    public function wanted(Request $request)
    {
        $params = $request->validate([
            'page' => 'integer',
            'pageSize' => 'integer',
            'sortKey' => 'string',
            'sortDir' => 'in:asc,desc',
        ]);

        $params['pageSize'] = $params['pageSize'] ?? 20;

        $issues = new IssueCollection(Issue::with('comic')->doesntHave('downloadedFile')->get());

        $sortFunc = $params['sortDir'] == 'asc' ? 'sortBy' : 'sortByDesc';

        $sorted = $issues->{$sortFunc}($params['sortKey']);

        return $this->paginate($sorted, $params['pageSize']);
    }

    protected function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);

        $items = $items instanceof Collection ? $items : Collection::make($items);

        $paginator = new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
        $output = $paginator->toArray();
        $output['data'] = array_values($output['data']);

        return $output;
    }
    */

    public function show(Issue $issue): IssueResource
    {
        return new IssueResource($issue);
    }

    public function update(Request $request, Issue $issue): IssueResource
    {
        $issue->fill($request->validate([
            'monitored' => 'boolean',
        ]));
        $issue->save();

        return new IssueResource($issue);
    }

    public function destroy(Issue $issue): JsonResponse
    {
        $issue->delete();

        /** @var JsonResponse */
        return response()->json(['status' => 'OK']);
    }
}
