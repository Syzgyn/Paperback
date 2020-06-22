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
Route::resource('comic', 'ComicController');

Route::apiResource('issue', 'IssueController');

Route::get('indexer/schema/{class}', 'IndexerController@schema');
Route::get('indexer/schema', 'IndexerController@schema');
Route::post('indexer/test', 'IndexerController@test');
Route::get('indexer/search', 'IndexerController@search');
Route::apiResource('indexer', 'IndexerController');


Route::get('downloader/schema/{class?}', 'DownloaderController@schema');
Route::get('downloader/schema', 'DownloaderController@schema');
Route::get('downloader/status/{downloadId}', 'DownloaderController@status');
Route::post('downloader/download', 'DownloaderController@download');
Route::post('downloader/test', 'DownloaderController@test');
Route::apiResource('downloader', 'DownloaderController');

Route::get('settings/{category}/{property}', 'SettingsController@property');
Route::get('settings/{category}', 'SettingsController@category');
Route::get('settings', 'SettingsController@index');
Route::post('settings', 'SettingsController@update');

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
