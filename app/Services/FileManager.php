<?php

namespace App\Services;

use App\Models\TrackedDownload;
use App\Models\Comic;
use App\Models\Issue;
use App\Models\IssueFile;
use Illuminate\Support\Facades\Log;

class FileManager
{
    const FILETYPES = [
        'cbr',
        'cbz',
        'cba',
        'cb7',
        'cbt',
    ];

    public function moveCompletedDownloads()
    {
        $downloads = TrackedDownload::with(['issue', 'issue.comic', 'comic'])
            ->where('status', TrackedDownload::DOWNLOAD_STATUS['Completed'])
            ->get();

        foreach($downloads as $download)
        {
            $this->moveCompletedDownload($download);
        }
    }

    protected function moveCompletedDownload(TrackedDownload $download)
    {
        Log::debug("Download {$download->download_id} completed, attempting to move files");

        $downloadPath = $download->getCompletedFilePath();
        $files = $this->getComicsInFolder($downloadPath);

        if (count($files) === 0)
        {
            if (!is_dir($downloadPath))
            {
                Log::error("Attmpted to look for files in $downloadPath, but no such directory exists");
            } else {
                Log::debug("No files found in $downloadPath");
            }

            $download->delete();
            return;
        }

        if (count($files) > 1)
        {
            Log::info("More than one comic archive found, aborting automatic import");
            return;
        }

        $downloadedFile = $files[0];
        $comicPath = $this->getOrCreateComicDir($download->comic);

        IssueFile::createAndMove([
            'comic_id' => $download->comic_id,
            'issue_id' => $download->issue_id,
            'original_file_path' => $downloadedFile,
        ]);

        $this->removeDir($downloadPath);
        $download->delete();
    }

    protected function getComicsInFolder($path)
    {
        if (!is_dir($path))
        {
            return [];
        }

        $results = [];
        $files = array_diff(scandir($path), array('.', '..')); 
        foreach($files as $file)
        {
            if (is_dir($path . DIRECTORY_SEPARATOR . $file))
            {
                $results = array_merge($results, $this->getComicsInFolder($path . DIRECTORY_SEPARATOR . $file));
                continue;
            }

            $info = pathinfo($path . DIRECTORY_SEPARATOR . $file);
            $extension = pathinfo($path . DIRECTORY_SEPARATOR . $file, PATHINFO_EXTENSION);
            if (in_array($extension, self::FILETYPES))
            {
                $results[] = $path . DIRECTORY_SEPARATOR . $file;
            }
        }

        return $results;
    }

    protected function getOrCreateComicDir(Comic $comic)
    {
        $path = $comic->fullDirectoryName; 
        if (!file_exists($path))
        {
            if (!mkdir($path))
            {
                Log::error("Unable to create directory for comic {$comic->name}");
                throw new \Exception("Unable to create directory for comic {$comic->name}");
            } else {
                Log::info("Created directory $path for comic {$comic->name}");
            }
        }

        return $path;
    }

    public function moveFile(string $original, string $new)
    {
        $extension = pathinfo($original, PATHINFO_EXTENSION);
        $new .= '.' . $extension;
        if (!rename($original, $new))
        {
            Log::error("Unable to create file $new");
            throw new \Exception("Unable to create file $new");
        }

        return $new;

    }

    public function removeDir($path)
    {
        $files = array_diff(scandir($path), array('.', '..')); 

        foreach ($files as $file)
        {
            if (is_dir($path . DIRECTORY_SEPARATOR . $file))
            {
                $this->removeDir($path . DIRECTORY_SEPARATOR . $file);
            }
            else
            {
                unlink($path . DIRECTORY_SEPARATOR . $file);
            }
        }

        if (rmdir($path))
        {
            Log::info("Successfully deleted directory $path");
            return true;
        } else {
            Log::error("Unable to delete directory $path");
            return false;
        }
    }
}
