<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\IssueCollection;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Resources\Issue as IssueResource;
use Illuminate\Pagination\LengthAwarePaginator;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $issues = Issue::all();

        return new IssueCollection($issues);
    }

    public function byComic(Request $request, Int $cvid)
    {
        $issues = Issue::where('comic_id', $cvid)->orderBy('issue_num', 'DESC')->get();

        return new IssueCollection($issues);
    }

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cvid = $request->input('cvid');
        $comic = Issue::createFromCvid($cvid, false);

        return new IssueResource($comic);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function show(Issue $issue)
    {
        return new IssueResource($issue);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Issue $issue)
    {
        $issue->fill($request->validate([
            'monitored' => 'boolean',
        ]));
        $issue->save();

        return new IssueResource($issue);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Issue $issue)
    {
        $issue->delete();

        return response()->json(['status' => 'OK']);
    }
}
