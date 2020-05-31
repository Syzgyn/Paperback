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

Route::resource('comic', 'ComicController');
Route::get('comic/search/{name}', 'ComicController@search');

Route::apiResource('issue', 'IssueController');
Route::apiResource('indexer', 'IndexerController');
Route::get('indexer/search/{query}/{offset?}', 'IndexerController@search');

Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
