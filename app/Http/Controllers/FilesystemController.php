<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesystemController extends Controller
{
    public function filesystem(Request $request)
    {
        $params = $request->validate([
            'path' => 'string|nullable',
            'includeFiles' => 'in:true,false',
            'allowFoldersWithoutTrailingSlashes' => 'in:true,false',
        ]);

        $params['path'] = $params['path'] ?? '';
        $params['includeFiles'] = (bool) ($params['includeFiles'] ?? false);
        $params['allowFoldersWithoutTrailingSlashes'] = (bool)($params['allowFoldersWithoutTrailingSlashes'] ?? false);

        $service = resolve('FileManager');

        return $service->getDirectoryListing($params['path'], $params['includeFiles'], $params['allowFoldersWithoutTrailingSlashes']);
    }
}
