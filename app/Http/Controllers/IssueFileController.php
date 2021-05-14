<?php

namespace App\Http\Controllers;

use App\Models\IssueFile;
use Illuminate\Http\Request;
use App\Http\Resources\IssueFile as IssueFileResource;
use App\Http\Resources\IssueFileCollection;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class IssueFileController extends Controller
{
    public function index(Request $request): IssueFileCollection
    {
        if ($comicId = $request->query('comicId')) {
            /** @var Collection */
            $issueFiles = IssueFile::where('comic_id', $comicId)->get();

            return new IssueFileCollection($issueFiles);
        }

        $issueFiles = IssueFile::all();

        return new IssueFileCollection($issueFiles);
    }

    public function show(IssueFile $issueFile): IssueFileResource
    {
        return new IssueFileResource($issueFile);
    }

    public function destroy(IssueFile $issueFile): JsonResponse
    {
        $issueFile->delete();
        //TODO: Delete actual file

        /** @var JsonResponse */
        return response()->json(['status' => 'OK']);
    }
}
