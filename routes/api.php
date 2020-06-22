<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ComicController;
use App\Http\Controllers\IndexerController;
use App\Http\Controllers\DownloaderController;
use App\Http\Controllers\SettingsController;

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

Route::get('comic/search', [ComicController::class, 'search']);
Route::resource('comic', ComicController::class);

Route::apiResource('issue', IssueController::class);

Route::get('indexer/schema/{class}', [IndexerController::class, 'schema']);
Route::get('indexer/schema', [IndexerController::class, 'schema']);
Route::post('indexer/test', [IndexerController::class, 'test']);
Route::get('indexer/search', [IndexerController::class, 'search']);
Route::apiResource('indexer', IndexerController::class);


Route::get('downloader/schema/{class}', [DownloaderController::class, 'schema']);
Route::get('downloader/schema', [DownloaderController::class, 'schema']);
Route::post('downloader/download', [DownloaderController::class, 'download']);
Route::post('downloader/test', [DownloaderController::class, 'test']);
Route::apiResource('downloader', DownloaderController::class);

Route::get('settings/{category}/{property}', [SettingsController::class, 'property']);
Route::get('settings/{category}', [SettingsController::class, 'category']);
Route::get('settings', [SettingsController::class, 'index']);
Route::post('settings', [SettingsController::class, 'update']);

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
