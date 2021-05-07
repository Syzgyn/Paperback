<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('comic/search', 'ComicController@search');
Route::get('comic/lookup', 'ComicController@lookup');
Route::post('comic/import', 'ComicController@import');
Route::get('comic/{comic}/download', 'ComicController@download');
Route::get('comic/{comic}/comicvine', 'ComicController@comicvine');
Route::resource('comic', 'ComicController');

Route::put('issue/monitor', 'IssueController@monitored');
Route::get('issue/byComic/{cvid}', 'IssueController@byComic');
Route::get('issue/wanted', 'IssueController@wanted');
Route::apiResource('issue', 'IssueController');

Route::apiResource('issueFile', 'IssueFileController');

Route::post('indexer/action/{action}', 'IndexerController@action')->middleware('provider');
Route::get('indexer/schema', 'IndexerController@schema')->middleware('provider');
Route::post('indexer/test', 'IndexerController@test')->middleware('provider');
Route::post('indexer/testall', 'IndexerController@testall')->middleware('provider');
Route::apiResource('indexer', 'IndexerController')->middleware('provider');

Route::get('release', 'ReleaseController@get');
Route::post('release', 'ReleaseController@download');

Route::get('downloader/schema/{class?}', 'DownloaderController@schema');
Route::get('downloader/schema', 'DownloaderController@schema');
Route::post('downloader/test', 'DownloaderController@test');
Route::get('testdownload', 'DownloaderController@testdownload');
Route::apiResource('downloader', 'DownloaderController');

Route::apiResource('trackeddownload', 'TrackedDownloadController')->parameters([
    'trackeddownload' => 'trackedDownload',
]);

Route::get('settings/naming/examples', 'SettingsController@namingExamples');
Route::get('settings/{category}/{property}', 'SettingsController@property');
Route::get('settings/{category}', 'SettingsController@category');
Route::get('settings', 'SettingsController@index');
Route::put('settings/{category}', 'SettingsController@update');

Route::apiResource('tag', 'TagController');

Route::get('history/issue/{id}', 'HistoryController@issue');
Route::get('history/issue/{id}', 'HistoryController@issue');

Route::get('rootFolder/{id}/getFolders', 'RootFolderController@getFolders');
Route::apiResource('rootFolder', 'RootFolderController');

Route::get('command', 'CommandController@command');
Route::get('filesystem', 'FilesystemController@filesystem');

Route::get('ddl/index', 'DDLController@index');
Route::get('ddl/page', 'DDLController@page');
Route::get('ddl/short', 'DDLController@short');
Route::get('ddl/download', 'DDLController@download');

Route::get('system/status', 'SystemController@status');
Route::get('health', 'SystemController@health');
Route::get('diskspace', 'SystemController@diskspace');
Route::get('update', 'SystemController@update');

Route::Get('queue/details', 'QueueController@details');
Route::get('wanted/missing', 'WantedController@missing');

/*
Route::fallback(function () {
    //return response()->json([
    //    'message' => 'Page Not Found.'], 404);
    return response()->json([]);
});
*/
