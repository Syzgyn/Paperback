<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\Disk\DiskProviderBase;
use App\Libraries\MediaFiles\IssueImport\ImportApprovedIssues;
use App\Models\Comic;
use App\Models\RootFolder;
use Exception;
use Illuminate\Support\Facades\Log;

class DiskScanService
{
    protected string $excludedSubfoldersRegex = "/(?:\\|\/|^)(?:extras|@eadir|\.@__thumb|extrafanart|plex versions|\.[^\/]+)(?:\\|\/)/i";
    protected string $excludedFilesRegex = "/^\._|^Thumbs\.db$/i";

    public function scan(Comic $comic): void
    {
        $rootFolder = RootFolder::getBestRootFolderPath($comic->path);
        $comicFolderExists = is_dir($comic->path);

        if (!$comicFolderExists) {
            if (!is_dir($rootFolder)) {
                Log::warning(sprintf("Comic root folder (%s) doesn't exist.", $rootFolder));
                //TODO: publish comicScanSkippedEvent
                return;
            }

            // Is dir empty?
            if (!(new \FilesystemIterator($rootFolder))->valid()) {
                Log::warning(sprintf("Comic root folder (%s) is empty.", $rootFolder));
                //TODO: publish comicScanSkippedEvent
                return;
            }
        }

        Log::debug("Scanning " . $comic->title);

        $settingsService = resolve("AppSettings");
        $createEmptyComicFolders = $settingsService->get("mediamanagement", "createEmptyComicFolders");
        $deleteEmptyFolders = $settingsService->get("mediamanagement", "deleteEmptyFolders");

        if (!$comicFolderExists) {
            if ($createEmptyComicFolders) {
                if ($deleteEmptyFolders) {
                    Log::debug(sprintf("Not creating missing comic folder: %s because delete empty comic folder is enabled", $comic->path));
                } else {
                    Log::debug(sprintf("Creating missing comic folder: %s", $comic->path));
                    $diskProvider = resolve("DiskProviderService");
                    $diskProvider->createFolder($comic->path);
                    $diskProvider->setPermissionsFromConfig($comic->path);
                }
            } else {
                Log::debug("Comic folder doesn't exist: " . $comic->path);
            }

            $this->cleanFiles($comic, []);
            $this->completedScanning($comic);

            return;
        }

        $issueFileList = $this->filterPaths($comic->path, $this->getIssueFiles($comic->path));
        Log::debug("Finished getting issue files for: " . $comic->title);

        $this->cleanFiles($comic, $issueFileList);

        $decisions = resolve("ImportDecisionMakerService")->getImportDecisions($issueFileList, $comic);
        Log::debug("Import decisions complete for: " . $comic->title);
        
        ImportApprovedIssues::import($decisions, false);

        $this->removeEmptyComicFolder($comic->path);
        $this->completedScanning($comic);
    }

    protected function cleanFiles(Comic $comic, array $fileList): void
    {
        Log::debug($comic->title . " Cleaning up issue files in DB");
        //TODO: clean issueFiles
    }

    protected function completedScanning(Comic $comic): void
    {
        Log::debug("Completed scanning disk for " . $comic->title);
        //TODO: event(new ComicScannedEvent($comic));
    }

    /** @return string[] */
    public function getIssueFiles(string $path, bool $allDirectories = true): array
    {
        Log::debug(sprintf("Scanning '%s' for issue files", $path));

        $searchFunc = $allDirectories ? "getFilesRecursive" : "getFiles";
        /** @var string[] */
        $filesOnDisk = resolve("DiskProviderService")->$searchFunc($path);

        $issueFileList = array_filter($filesOnDisk, function($file) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            return in_array($extension, IssueFileExtensions::$extensions);
        });

        Log::debug(sprintf("%d files were found in %s", count($filesOnDisk), $path));
        Log::debug(sprintf("%d issue files were found in %s", count($issueFileList), $path));

        return $issueFileList;
    }

    public function getNonIssueFiles(string $path, bool $allDirectories = true): array
    {
        Log::debug(sprintf("Scanning '%s' for non-issue files", $path));

        $searchFunc = $allDirectories ? "getFilesRecursive" : "getFiles";
        /** @var string[] */
        $filesOnDisk = resolve("DiskProviderService")->$searchFunc($path);

        $issueFileList = array_filter($filesOnDisk, function($file) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            return !in_array($extension, IssueFileExtensions::$extensions);
        });

        Log::debug(sprintf("%d files were found in %s", count($filesOnDisk), $path));
        Log::debug(sprintf("%d non-issue files were found in %s", count($issueFileList), $path));

        return $issueFileList;
    }

    /** 
     * @param string[] $paths
     * 
     * @return string[] 
     */
    public function filterPaths(string $basePath, array $paths): array
    {
        return array_filter($paths, function(string $path) {
            if (preg_match($this->excludedSubfoldersRegex, $path) ||
                preg_match($this->excludedFilesRegex, $path)) {
                    return false;
                }

            return true;
        });
    }

    public function removeEmptyComicFolder(string $path): void
    {
        if (resolve("AppSettings")->get("mediamanagement", "deleteEmptyFolders")) {
            /** @var DiskProviderBase */
            $diskService = resolve("DiskServiceProvider");
            $diskService->removeEmptySubfolders($path);

            if ($diskService->folderEmpty($path)) {
                $diskService->deleteFolder($path);
            }
        }
    }
}