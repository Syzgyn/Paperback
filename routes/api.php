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

Route::apiResource('downloader', 'DownloaderController');
Route::post('downloader/download', 'DownloaderController@download');
Route::post('downloader/test', 'DownloaderController@test');

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
