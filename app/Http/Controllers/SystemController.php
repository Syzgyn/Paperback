<?php

namespace App\Http\Controllers;

use App\Libraries\SSE;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\JsonResponse as HttpFoundationJsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class SystemController extends Controller
{
    public function status(): JsonResponse
    {
        //TODO: Proper system info
        $data = [
			'version' => '0.1',
			'buildTime' => 'N/A',
			'isDebug' => config('app.debug'),
			'isProduction' => config('app.env') === 'production',
			'isAdmin' => false,
			'isUserInteractive' => false,
			'startupPath' => base_path(),
			'appData' => storage_path('app'),
			'osName' => PHP_OS,
			'osVersion' => php_uname('r'),
			'isMonoRuntime' => true,
			'isMono' => true,
			'isLinux' => PHP_OS === 'Linux',
			'isOsx' => PHP_OS === 'Darwin',
			'isWindows' => PHP_OS === 'WINNT',
			'mode' => 'console',
			'branch' => 'master',
			'authentication' => 'none',
			'sqliteVersion' => $this->getSqliteVersion(),
			'urlBase' => $_SERVER['SERVER_NAME'],
			'runtimeVersion' => phpversion(),
			'runtimeName' => 'php',
			'startTime' => 'todo',
			'packageVersion' => phpversion(),
			'packageAuthor' => 'Syzgyn',
			'packageUpdateMechanism' => 'builtIn'
        ];

        /** @var JsonResponse */
        return response()->json($data);
    }

    protected function getSqliteVersion(): string
    {
        $dbh = new \PDO('sqlite::memory:');
        $version = (string)((array)$dbh->query('select sqlite_version()')->fetch())[0];
        $dbh = null;

        return $version;
    }

    public function health(): JsonResponse
    {
        //TODO
        /** @var JsonResponse */
        return response()->json([[
            'source' => 'UpdateCheck',
            'type' => 'warning',
            'message' => 'New update is available',
            'wikiUrl' => 'https://wiki.servarr.com/Sonarr_System#new_update_is_available',
        ]]);
    }

    public function diskspace(): JsonResponse
    {
        /** @var JsonResponse */
        return response()->json([[
            'path' => dirname(base_path(), 1000),
            'label' => '',
            'freeSpace' => disk_free_space(base_path()),
            'totalSpace' => disk_total_space(base_path()),
        ]], options: JSON_PRETTY_PRINT);
    }

    //TODO
    public function update(): JsonResponse
    {
        /** @var JsonResponse */
        return response()->json([]);
    }

    public function events(): StreamedResponse
    {
        $response = new StreamedResponse();
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');
        $response->headers->set("Content-Encoding", "none");
        $response->setCallback([SSE::class, "responseCallback"]);

        return $response;
    }
}
