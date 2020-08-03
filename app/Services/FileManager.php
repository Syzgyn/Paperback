<?php

namespace App\Services;

use App\Models\Comic;
use App\Models\IssueFile;
use App\Models\TrackedDownload;
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

        foreach ($downloads as $download) {
            $this->moveCompletedDownload($download);
        }
    }

    protected function moveCompletedDownload(TrackedDownload $download)
    {
        Log::debug("Download {$download->download_id} completed, attempting to move files");

        $downloadPath = $download->getCompletedFilePath();
        $files = $this->getComicsInFolder($downloadPath);

        if (count($files) === 0) {
            if (! is_dir($downloadPath)) {
                Log::error("Attmpted to look for files in $downloadPath, but it doesn't exist");
            } else {
                Log::debug("No comic archives found in $downloadPath");
            }

            $download->delete();

            return;
        }

        if (count($files) > 1) {
            Log::info('More than one comic archive found, aborting automatic import');

            return;
        }

        $downloadedFile = $files[0];
        $comicPath = $this->getOrCreateComicDir($download->comic);

        IssueFile::createAndMove([
            'comic_id' => $download->comic_id,
            'issue_id' => $download->issue_id,
            'original_file_path' => $downloadedFile,
        ]);

        if (is_dir($downloadPath)) {
            $this->removeDir($downloadPath);
        }
        $download->delete();
    }

    public function getComicsInFolder($path)
    {
        if (! is_dir($path)) {
            //Check if path is the file itself
            if ($this->checkFileType($path)) {
                return [$path];
            }

            return [];
        }

        $results = [];
        $files = array_diff(scandir($path), ['.', '..']);
        foreach ($files as $file) {
            if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                $results = array_merge($results, $this->getComicsInFolder($path . DIRECTORY_SEPARATOR . $file));
                continue;
            }

            if ($goodPath = $this->checkFileType($path . DIRECTORY_SEPARATOR . $file)) {
                $results[] = $goodPath;
            }
        }

        return $results;
    }

    protected function checkFileType($path)
    {
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        if (in_array($extension, self::FILETYPES) && file_exists($path)) {
            return $path;
        }

        return null;
    }

    public function getOrCreateComicDir(Comic $comic)
    {
        $path = $comic->fullDirectoryName;
        if (! file_exists($path)) {
            if (! mkdir($path)) {
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
        if (! rename($original, $new)) {
            Log::error("Unable to create file $new");
            throw new \Exception("Unable to create file $new");
        }

        return $new;
    }

    public function removeDir($path)
    {
        $files = array_diff(scandir($path), ['.', '..']);

        foreach ($files as $file) {
            if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                $this->removeDir($path . DIRECTORY_SEPARATOR . $file);
            } else {
                unlink($path . DIRECTORY_SEPARATOR . $file);
            }
        }

        if (rmdir($path)) {
            Log::info("Successfully deleted directory $path");

            return true;
        } else {
            Log::error("Unable to delete directory $path");

            return false;
        }
    }

    public function getDirectoryListing($path = '', $includeFiles = false)
    {
        $path .= DIRECTORY_SEPARATOR;
        $output = [
            'directories' => [],
            'files' => [],
        ];
        $contents = scandir($path);

        foreach ($contents as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            if (is_dir($path . $file)) {
                $output['directories'][] = [
                    'type' => 'dir',
                    'name' => $file,
                    'path' => $path . $file,
                ];
            } else {
                if ($includeFiles) {
                    $output['files'][] = [
                        'type' => 'file',
                        'name' => $file,
                        'path' => $path . $file,
                    ];
                }
            }
        }

        return $output;
    }

    public function removeEmptyDir(string $path)
    {
        $data = $this->getDirectoryListing($path, true);
        if (count($data['files'])) {
            return;
        }

        $this->removeDir($path);
    }
}
