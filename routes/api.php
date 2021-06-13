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

Route::post('downloadclient/action/{action}', 'DownloadClientController@action')->middleware('provider');
Route::get('downloadclient/schema', 'DownloadClientController@schema')->middleware('provider');
Route::post('downloadclient/test', 'DownloadClientController@test')->middleware('provider');
Route::post('downloadclient/testall', 'DownloadClientController@testall')->middleware('provider');
Route::apiResource('downloadclient', 'DownloadClientController')->middleware('provider');

Route::apiResource('remotepathmapping', 'RemotePathMappingController');

Route::get('release', 'ReleaseController@get');
Route::post('release', 'ReleaseController@download');

Route::apiResource('trackeddownload', 'TrackedDownloadController')->parameters([
    'trackeddownload' => 'trackedDownload',
]);

Route::get('settings/naming/examples', 'SettingsController@namingExamples');
Route::get('settings/{category}/{property}', 'SettingsController@property');
Route::get('settings/{category}', 'SettingsController@category');
Route::get('settings', 'SettingsController@index');
Route::put('settings/{category}', 'SettingsController@update');

Route::apiResource('tag', 'TagController');

Route::get('rootFolder/{id}/getFolders', 'RootFolderController@getFolders');
Route::apiResource('rootFolder', 'RootFolderController');

Route::get('command', 'CommandController@index');
Route::post('command', 'CommandController@start');
Route::get('command/{id}', 'CommandController@get');
Route::delete('command/{id}', 'CommandController@cancel');



Route::get('filesystem', 'FilesystemController@filesystem');

/*
Route::get('ddl/index', 'DDLController@index');
Route::get('ddl/page', 'DDLController@page');
Route::get('ddl/short', 'DDLController@short');
Route::get('ddl/download', 'DDLController@download');
*/

Route::get('system/status', 'SystemController@status');
Route::get('system/events', 'SystemController@events');
Route::get('health', 'SystemController@health');
Route::get('diskspace', 'SystemController@diskspace');
Route::get('update', 'SystemController@update');

Route::get('queue', 'QueueController@index');
Route::get('queue/details', 'QueueController@details');
Route::get('queue/status', 'QueueController@status');
Route::delete('queue/bulk', 'QueueController@deleteBulk');
Route::delete('queue/{id}', 'QueueController@deleteOne');

Route::get('history', 'HistoryController@index');
Route::get('history/since', 'HistoryController@getHistorySince');
Route::get('history/comic', 'HistoryController@getComicHistory');
Route::post('history/failed/{id}', 'HistoryController@markAsFailed');

Route::get('log', 'LogController@index');

Route::get('wanted/missing', 'WantedController@missing');

/*
Route::fallback(function () {
    //return response()->json([
    //    'message' => 'Page Not Found.'], 404);
    return response()->json([]);
});
*/
