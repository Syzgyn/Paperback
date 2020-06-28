<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use App\Models\TrackedDownload;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('paperback:check-downloads', function() {
    foreach(TrackedDownload::where('status', '!=', TrackedDownload::DOWNLOAD_STATUS['Completed'])->get() as $download)
    {
        $download->updateFromClient();
    }
    resolve('FileManager')->moveCompletedDownloads();
})->describe('Check for recently completed downloads');
