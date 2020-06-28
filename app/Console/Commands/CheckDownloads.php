<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TrackedDownload;

class CheckDownloads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'paperback:checkDownloads';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for recently completely downloads';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $downloads = TrackedDownload::all();
        foreach($downloads as $download)
        {
            $download->updateFromClient();
        }
    }
}
