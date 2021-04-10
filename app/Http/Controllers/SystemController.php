<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function status()
    {
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
}
