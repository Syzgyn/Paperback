<?php

namespace App\Http\Controllers;

use App\Http\Resources\ManualImportCollection;
use App\Libraries\MediaFiles\IssueImport\Manual\ManualImportService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Exception;

class ManualimportController extends Controller
{
    public function get(Request $request): Collection
    {
        /** @var string */
        $folder = $request->input("folder");
        /** @var ?string */
        $downloadId = $request->input("downloadId");
        $filterExistingFiles = (bool) $request->input("filterExistingFiles", true);
        $comicId = (int) $request->input("comicId");

        return new Collection(
            ManualImportService::getMediaFiles($folder, $downloadId, $comicId, $filterExistingFiles)
        );
    }

    public function reprocessItems(Request $request): array
    {
        /** @var array[] */
        $items = $request->all();

        foreach ($items as $key => $item) {
            $processedItem = ManualImportService::reprocessItem((string) $item['path'], (string) $item['downloadId'], (int) $item['comicId'], (array) $item['issueIds']);

            $items[$key]['issues'] = $processedItem->issues;
            $items[$key]['rejections'] = $processedItem->rejections;

            unset($items[$key]['issueIds']);
        }

        return $items;
    }
}