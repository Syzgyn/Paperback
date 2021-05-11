<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function status()
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

        return response()->json($data);
    }

    protected function getSqliteVersion()
    {
        $dbh = new \PDO('sqlite::memory:');
        $version = $dbh->query('select sqlite_version()')->fetch()[0];
        $dbh = null;

        return $version;
    }

    public function health()
    {
        //TODO
        return response()->json([[
            'source' => 'UpdateCheck',
            'type' => 'warning',
            'message' => 'New update is available',
            'wikiUrl' => 'https://wiki.servarr.com/Sonarr_System#new_update_is_available',
        ]]);
    }

    public function diskspace()
    {
        return response()->json([[
            'path' => dirname(base_path(), 1000),
            'label' => '',
            'freeSpace' => disk_free_space(base_path()),
            'totalSpace' => disk_total_space(base_path()),
        ]], options: JSON_PRETTY_PRINT);
    }

    //TODO
    public function update()
    {
        return response()->json([]);
    }
}
