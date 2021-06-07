<?php

namespace App\Libraries\Disk;

use DateTime;
use Exception;

abstract class DiskProviderBase
{
    public abstract function getAvailableSpace(string $path): int;
    public abstract function inheritFolderPermissions(string $filename): void;
    public abstract function setPermissions(string $path, string $mask, string $group): void;
    public abstract function copyPermissions(string $sourcePath, string $targetPath): void;
    public abstract function getTotalSize(string $path): int;

    protected function checkFolderExists(string $path): void
    {
        //Check if valid path
        if (!is_dir($path)) {
            throw new Exception("Directory doesn't exist. " . $path);
        }
    }

    public function setPermissionsFromConfig(string $path): void
    {
        $settings = resolve("AppSettings");

        if (!$settings->get("mediamanagemnt", "setPermissionsLinux")) {
            return;
        }

        try {
            $this->setPermissions(
                    $path, 
                    $settings->get("mediamanagemnt", "chmodFolder"),
                    $settings->get("mediamanagement", "chownGroup")
                );
        } catch (Exception $e) {
            //TODO: Log
        }
    }

    public function folderGetCreationTime(string $path): DateTime
    {
        $this->checkFolderExists($path);

        return new DateTime("@" . filectime($path));
    }

    public function folderGetLastWrite(string $path): DateTime
    {
        $this->checkFolderExists($path);

        $files = $this->getFilesRecursive($path);

        if (empty($files)) {
            return new DateTime("@" . filemtime($path));
        }

        $maxWriteTime = 0;

        /** @var string $file */
        foreach ($files as $file) {
            $maxWriteTime = max($maxWriteTime, filemtime($file));
        }

        return new DateTime("@$maxWriteTime");
    }

    public function fileGetLastWrite(string $path): DateTime
    {
        return new DateTime("@" . filemtime($path));
    }

    public function ensureFolder(string $path): void
    {
        if (!$this->folderExists($path)) {
            $this->createFolder($path);
        }
    }

    public function folderExists(string $path): bool
    {
        return is_dir($path);
    }

    public function fileExists(string $path): bool
    {
        return is_file($path);
    }

    public function folderWritable(string $path): bool
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

    public function folderEmpty(string $path): bool
    {
        return !(new \FilesystemIterator($path))->valid();
    }

    public function getDirectories(string $path): array
    {
        $path = rtrim($path, DIRECTORY_SEPARATOR);

        return array_filter(scandir($path), function(string $i) use ($path) {
            if (in_array($i, [".", ".."])) {
                return false;
            }

            return is_dir($path . DIRECTORY_SEPARATOR . $i);
        });
    }

    public function createFolder(string $path): void
    {
        mkdir($path, 777, true);
    }

    public function getFiles(string $path): array
    {
        $contents = scandir($path);

        if ($contents === false) {
            return [];
        }

        return array_filter($contents, fn($i) => !is_dir($path . $i));
    }

    public function getFilesRecursive(string $path): array
    {
        $contents = scandir($path);

        if ($contents === false) {
            return [];
        }

        $output = [];

        foreach ($contents as $item) {
            if (in_array($item, [".", ".."])) {
                continue;
            }

            if (is_dir($path . $item)) {
                $output += $this->getFilesRecursive($path . $item);
            } else {
                $output[] = $path . $item;
            }
        }

        return $output;
    }

    public function getFolderSize(string $path): int
    {
        $size = 0;

        /** @var \DirectoryIterator $file */
        foreach(new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path)) as $file){
            $size += $file->getSize();
        }

        return $size;
    }

    public function getFileSize(string $path): int
    {
        return filesize($path);
    }

    public function deleteFile(string $path): void
    {
        unlink($path);
    }

    public function copyFile(string $source, string $dest, bool $overwrite = false): bool
    {
        if ($source == $dest) {
            throw new Exception("Source and destination can't be the same. " . $source);
        }

        if (is_file($dest) && !$overwrite) {
            throw new Exception("File $dest exists, cannot overwrite");
        }

        return copy($source, $dest);
    }

    public function moveFile(string $source, string $dest, bool $overwrite = false): bool
    {
        if ($source == $dest) {
            throw new Exception("Source and destination can't be the same. " . $source);
        }

        if (is_file($dest) && !$overwrite) {
            throw new Exception("$dest exists, cannot overwrite");
        }

        return rename($source, $dest);
    }

    public function moveFolder(string $source, string $dest, bool $overwrite = false): bool
    {
        return $this->moveFile($source, $dest, $overwrite);
    }

    public function deleteFolder(string $path): bool
    {
        if (!is_dir($path)) {
            return true;
        }

        $this->emptyFolder($path);

        return rmdir($path);
    }

    public function emptyFolder(string $path): void
    {
        if (!is_dir($path)) {
            return;
        }

        $fileListing = scandir($path);
        if ($fileListing === false) {
            return;
        }

        $files = array_diff($fileListing, ['.', '..']);

        foreach ($files as $file) {
            if (is_dir($path . DIRECTORY_SEPARATOR . $file)) {
                $this->emptyFolder($path . DIRECTORY_SEPARATOR . $file);
            } else {
                unlink($path . DIRECTORY_SEPARATOR . $file);
            }
        }
    }

    public function removeEmptySubfolders(string $path): void
    {
        /** @var string $dir */
        foreach($this->getDirectories($path) as $dir) {
            $this->removeEmptySubfolders($path . DIRECTORY_SEPARATOR . $dir);

            if ($this->folderEmpty($path)) {
                $this->deleteFolder($path);
            }
        }
    }

    public function isFileLocked(string $file): bool
    {
        $fp = fopen($file, 'w');

        if (!flock($fp, LOCK_EX|LOCK_NB)) {
            fclose($fp);
            return false;
        } else {
            fclose($fp);
            return true;
        }
    }
}