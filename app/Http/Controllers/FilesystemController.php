<?php

namespace App\Http\Controllers;

use App\Services\FileManager;
use Illuminate\Http\Request;

class FilesystemController extends Controller
{
    /** @return array{
     *  directories: list<array{name: string, path: string, type: "dir"}>, 
     *  files: list<array{name: string, path: string, type: "file"}>, 
     *  parent?: non-empty-string
     * } */
    public function filesystem(Request $request): array
    {
        /** @var array{path: string, includeFiles: 'true'|'false', allowFoldersWithoutTrailingSlashes: 'true'|'false'} $params */
        $params = $request->validate([
            'path' => 'string|nullable',
            'includeFiles' => 'in:true,false',
            'allowFoldersWithoutTrailingSlashes' => 'in:true,false',
        ]);

        $params['path'] = $params['path'] ?? '';
        $params['includeFiles'] = (bool) ($params['includeFiles'] ?? false);
        $params['allowFoldersWithoutTrailingSlashes'] = (bool)($params['allowFoldersWithoutTrailingSlashes'] ?? false);

        /** @var FileManager */
        $service = resolve('FileManager');

        return $service->getDirectoryListing($params['path'], $params['includeFiles'], $params['allowFoldersWithoutTrailingSlashes']);
    }
}
