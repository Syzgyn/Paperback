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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('comic/search', 'ComicController@search');
Route::get('comic/importSearch', 'ComicController@importSearch');
Route::get('comic/{comic}/download', 'ComicController@download');
Route::get('comic/{comic}/comicvine', 'ComicController@comicvine');
Route::resource('comic', 'ComicController');

Route::put('issue/monitor', 'IssueController@monitored');
Route::get('issue/byComic/{cvid}', 'IssueController@byComic');
Route::get('issue/wanted', 'IssueController@wanted');
Route::apiResource('issue', 'IssueController');

Route::get('indexer/schema/{class}', 'IndexerController@schema');
Route::get('indexer/schema', 'IndexerController@schema');
Route::post('indexer/test', 'IndexerController@test');
Route::get('indexer/search', 'IndexerController@search');
Route::get('indexer/autosearch', 'IndexerController@autosearch');
Route::apiResource('indexer', 'IndexerController');


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

Route::get('history/issue/{id}', 'HistoryController@issue');

Route::get('rootFolder/{id}/getFolders', 'RootFolderController@getFolders');
Route::post('rootFolder/import', 'RootFolderController@import');
Route::apiResource('rootFolder', 'RootFolderController');

Route::get('command', 'CommandController@command');
Route::get('filesystem', 'FilesystemController@filesystem');

Route::get('ddl/index', 'DDLController@index');
Route::get('ddl/page', 'DDLController@page');
Route::get('ddl/short', 'DDLController@short');
Route::get('ddl/download', 'DDLController@download');

Route::get('system/status', 'SystemController@status');

Route::fallback(function () {
    //return response()->json([
    //    'message' => 'Page Not Found.'], 404);
    return response()->json([]);
});
