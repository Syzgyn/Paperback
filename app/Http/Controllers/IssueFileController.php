<?php

namespace App\Http\Controllers;

use App\Models\IssueFile;
use Illuminate\Http\Request;
use App\Http\Resources\IssueFile as IssueFileResource;
use App\Http\Resources\IssueFileCollection;

class IssueFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($comicId = $request->query('comicId')) {
            $issueFiles = IssueFile::where('comic_id', $comicId)->get();

            return new IssueFileCollection($issueFiles);
        }

        $issueFiles = IssueFile::all();

        return new IssueCollection($issueFiles);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueFile  $issueFile
     * @return \Illuminate\Http\Response
     */
    public function show(IssueFile $issueFile)
    {
        return new IssueFileResource($issueFile);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueFile  $issueFile
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueFile $issueFile)
    {
        $issueFile->delete();
        //TODO: Delete actual file

        return response()->json(['status' => 'OK']);
    }
}
