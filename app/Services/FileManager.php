<?php

namespace App\Services;

use Exception;
use App\Models\Comic;
use App\Models\IssueFile;
use App\Models\TrackedDownload;
use Illuminate\Support\Facades\Log;
use \wapmorgan\UnifiedArchive\UnifiedArchive;
use \SimpleXMLElement;

class FileManager
{
    const FILETYPES = [
        'cbr',
        'cbz',
        'cba',
        'cb7',
        'cbt',
    ];

    const PROTECTED_DIRS = [
        // Windows
        "boot",
        "bootmgr",
        "cache",
        "msocache",
        "recovery",
        '$recycle.bin',
        "recycler",
        "system volume information",
        "temporary internet files",
        "windows",

        // OS X
        ".fseventd",
        ".spotlight",
        ".trashes",
        ".vol",
        "cachedmessages",
        "caches",
        "trash",

        // QNAP
        ".@__thumb",

        // Synology
        "@eadir",
        "#recycle"
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
        $files = $this->getIssuesInFolder($downloadPath);

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

    public function manageDirectDownload(TrackedDownload $download)
    {
        $downloadedFile = $download->ddlFilename;

        //If it's a single issue that's already the correct type
        if ($this->checkFileType($downloadedFile)) {
            IssueFile::createAndMove([
                'comic_id' => $download->comic_id,
                'issue_id' => $download->issue_id,
                'original_file_path' => $downloadedFile,
            ]);

            $download->delete();

            return;
        }

        //Check if it's a zipfile and unzip the contents
        $fileInfo = pathinfo($downloadedFile);
        $destDir = $fileInfo['dirname'] . DIRECTORY_SEPARATOR . $fileInfo['basename'];
        mkdir($destDir);
        $result = $this->extractArchive($downloadedFile, $destDir);

        //TODO: Manage other filetypes too
        if (! $result) {
            Log::error('The direct downloaded file failed to unzip.  Aborting');
            $download->delete();

            return;
        }

        $files = $this->getIssuesInFolder($destDir);

        if (count($files) === 0) {
            if (! is_dir($destDir)) {
                Log::error("Attmpted to look for files in $destDir, but it doesn't exist");
            } else {
                Log::debug("No comic archives found in $destDir");
            }

            $download->delete();

            return;
        }

        //Single file, assume it's for the specified issue
        if (count($files) == 1) {
            IssueFile::createAndMove([
                'comic_id' => $download->comic_id,
                'issue_id' => $download->issue_id,
                'original_file_path' => $files[0],
            ]);

            $this->removeDir($destDir);
            $download->delete();

            return;
        }

        //Multiple files, need to match them to specific issues
        $comic = $download->comic->with('issues');
        $parser = resolve('OldParserService');

        //Look for ComicInfo.xml in each archive
        foreach ($files as $file) {
            $issueNum = null;
            $archive = UnifiedArchive::open($file);
            if ($archive && $archive->isFileExists('ComicInfo.xml')) {
                $xml = $archive->getFileContents('ComicInfo.xml');
                $issueNum = $this->getIssueFromComicInfoXml($xml);
            } else {
                //No XML found, parse the name to get the issue number
                $info = $parser->getIssueInfoFromFile($file);
                $issueNum = $info['issueNum'];
            }

            if ($issueNum) {
                $key = $comic->issues->search(function ($item, $issue) use ($issueNum) {
                    return $issue->issue_num == $issueNum;
                });

                if ($key !== false) {
                    IssueFile::createAndMove([
                        'comic_id' => $download->comic_id,
                        'issue_id' => $comic->issues[$key],
                        'original_file_path' => $file,
                    ]);

                    Log::info("Matched $file to {$comic->name} issue $issueNum");
                    continue;
                }
            }

            Log::info("No matching issue found for $file");
        }
    }

    public function extractArchive($filename, $destDir)
    {
        $archive = UnifiedArchive::open($filename);
        if (! $archive) {
            return false;
        }

        $archive->extractFiles($destDir);

        return true;
    }

    public function getIssueFromComicInfoXml(string $xml)
    {
        $info = new SimpleXMLElement($xml);

        return $info->number;
    }

    /** @return string[] */
    public function getIssuesInFolder($path): array
    {
        if (! is_dir($path)) {
            //Check if path is the file itself
            if ($this->checkFileType($path)) {
                return [$path];
            }

            return [];
        }

        $results = [];
        $files = $this->getDirectoryListing($path, true)['files'];

        foreach ($files as $file) {
            if ($this->checkFileType($file['path'])) {
                $results[] = $file['name'];
            }
        }

        return $results;
    }

    // Checks if the given path is a valid comic archive file or not 
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
        $path = $comic->path;
        if (! file_exists($path)) {
            if (! mkdir($path)) {
                Log::error("Unable to create directory for comic {$comic->name}");
                throw new \Exception("Unable to create directory for comic {$comic->name}");
            } else {
                chmod($path, 0775);
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
        if (!is_dir($path)) {
            Log::warning("$path is not a valid directory");
            return true;
        }

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

    /** @return array{directories: list<array{name: string, path: string, type: "dir"}>, files: list<array{name: string, path: string, type: "file"}>, parent?: non-empty-string} */
    public function getDirectoryListing(string $path = null, bool $includeFiles = false, bool $allowFoldersWithoutTrailingSlashes = false): array
    {
        if (!$path) {
            if (DIRECTORY_SEPARATOR === '/') {
                // unix based
                $path = '/';
            } else {
                // windows, this is kinda hacky
                $path = dirname(__DIR__, 100);
            }
        }

        $output = [
            'parent' => dirname($path),
            'directories' => [],
            'files' => [],
        ];

        if ($output['parent'] === '' || $output['parent'] === $path) {
            unset($output['parent']);
        }

        if (!is_dir($path)) {
            Log::warning("$path is not a valid directory");
            return $output;
        }

        if (!str_ends_with($path, DIRECTORY_SEPARATOR)) {
            $path .= DIRECTORY_SEPARATOR;
        }

        $contents = scandir($path);

        foreach ($contents as $file) {
            if ($file === '.' || $file === '..' || (is_dir($path . $file) && in_array($file, self::PROTECTED_DIRS))) {
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

    public function folderIsWritable(string $path): bool
    {
        if (!is_dir($path)) {
            throw new Exception("Path $path does not exist");
        }

        try {
            $filePath = $path . DIRECTORY_SEPARATOR . "paperback_write_text.txt";
            $testContent = "This file was created to verify if '$path' is writable. It should've been automatically deleted. Feel free to delete it.";
            $bytes = file_put_contents($filePath, $testContent);
            unlink($filePath);

            if ($bytes === false) {
                throw new Exception("Unwritable");
            }

            return true;
        } catch (Exception $e) {
            //TODO: log
            return false;
        }
    }
}
