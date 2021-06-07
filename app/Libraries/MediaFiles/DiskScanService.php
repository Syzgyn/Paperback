<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\Disk\DiskProviderBase;
use App\Models\Comic;
use App\Models\RootFolder;
use Exception;

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
                //TODO: Log
                //TODO: publish comicScanSkippedEvent
                return;
            }

            // Is dir empty?
            if (!(new \FilesystemIterator($rootFolder))->valid()) {
                //TODO: Log
                //TODO: publish comicScanSkippedEvent
                return;
            }
        }

        //TODO: Log

        $settingsService = resolve("AppSettings");
        $createEmptyComicFolders = $settingsService->get("mediamanagement", "createEmptyComicFolders");
        $deleteEmptyFolders = $settingsService->get("mediamanagement", "deleteEmptyFolders");

        if (!$comicFolderExists) {
            if ($createEmptyComicFolders) {
                if ($deleteEmptyFolders) {
                    //TODO: Log
                } else {
                    //TODO: Log
                    mkdir($comic->path, 777, true);
                    $this->setPermissions($comic->path);
                }
            } else {
                //TODO: Log
            }

            $this->cleanFiles($comic, []);
            $this->completedScanning($comic);

            return;
        }

        
    }

    protected function cleanFiles(Comic $comic, array $fileList): void
    {
        //TODO: clean issueFiles
    }

    protected function completedScanning(Comic $comic): void
    {
        //TODO: Log
        //TODO: event(new ComicScannedEvent($comic));
    }

    /** @return string[] */
    public function getIssueFiles(string $path, bool $allDirectories = true): array
    {
        //TODO: Log
        $searchFunc = $allDirectories ? "getFilesRecursive" : "getFiles";
        /** @var string[] */
        $filesOnDisk = resolve("DiskProvider")->$searchFunc($path);

        $issueFileList = array_filter($filesOnDisk, function($file) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            return in_array($extension, IssueFileExtensions::$extensions);
        });

        //TODO: Log

        return $issueFileList;
    }

    public function getNonIssueFiles(string $path, bool $allDirectories = true): array
    {
        //TODO: Log
        $searchFunc = $allDirectories ? "getFilesRecursive" : "getFiles";
        /** @var string[] */
        $filesOnDisk = resolve("DiskProviderService")->$searchFunc($path);

        $issueFileList = array_filter($filesOnDisk, function($file) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            return !in_array($extension, IssueFileExtensions::$extensions);
        });

        //TODO: Log

        return $issueFileList;
    }

    /** 
     * @param string[] $paths
     * 
     * @return string[] 
     */
    public function filterPaths(string $basePath, array $paths): array
    {
        return array_filter($paths, function(string $path) use ($basePath) {
            if (preg_match($this->excludedSubfoldersRegex, $basePath . DIRECTORY_SEPARATOR . $path) !== false ||
                preg_match($this->excludedFilesRegex, $path) !== false) {
                    return false;
                }

            return true;
        });
    }

    protected function setPermissions(string $path): void
    {
        $settings = resolve("AppSettings");
        if (!$settings->get("mediamanagemnt", "setPermissionsLinux")) {
            return;
        }

        try {
            resolve("DiskProviderService")->
                setPermissions(
                    $path, 
                    $settings->get("mediamanagemnt", "chmodFolder"),
                    $settings->get("mediamanagement", "chownGroup")
                );
        } catch (Exception $e) {
            //TODO: Log
        }
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