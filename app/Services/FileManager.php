<?php

namespace App\Services;

use App\Models\Comic;
use App\Models\IssueFile;
use App\Models\TrackedDownload;
use App\Models\Downloaders\DirectDownload;
use Illuminate\Support\Facades\Log;
use \wapmorgan\UnifiedArchive\UnifiedArchive;


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
            Log::error("The direct downloaded file failed to unzip.  Aborting");
            $download->delete();
            return;
        }

        $files = $this->getComicsInFolder($path);

        if (count($files) === 0) {
            if (! is_dir($path)) {
                Log::error("Attmpted to look for files in $downloadPath, but it doesn't exist");
            } else {
                Log::debug("No comic archives found in $downloadPath");
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

            $this->removeDir($path);
            $download->delete();
            
            return;
        }

        //Multiple files, need to match them to specific issues
        $comic = $download->comic->with('issues');
        $parser = resolve('ParserService');

        //Look for ComicInfo.xml in each archive
        foreach($files as $file) {
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
                $key = $comic->issues->search(function($item, $issue) use ($issueNum) {
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
                chmod($path, 0777);
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
