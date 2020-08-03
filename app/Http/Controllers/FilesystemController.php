<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesystemController extends Controller
{
    public function filesystem(Request $request)
    {
        $params = $request->validate([
            'path' => 'string|nullable',
            'showFiles' => 'boolean',
        ]);

        $params['path'] = $params['path'] ?? '';
        $params['showFiles'] = $params['showFiles'] ?? false;

        $service = resolve('FileManager');

        return $service->getDirectoryListing($params['path'], $params['showFiles']);
    }
}
