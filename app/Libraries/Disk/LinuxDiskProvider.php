<?php

namespace App\Libraries\Disk;

use Exception;

class LinuxDiskProvider extends DiskProviderBase
{
    public function getAvailableSpace(string $path): int
    {
        return (int) disk_free_space($path);
    }

    public function inheritFolderPermissions(string $filename): void
    {
        
    }

    public function setPermissions(string $path, string $mask, string $group): void
    {
        if (!chmod($path, (int) $mask)) {
            throw new Exception("Error setting permissions: " . $path);
        }

        if (!empty($group) && !chgrp($path, $group)) {
            throw new Exception("Error setting group: " . $path);
        }
    }

    public function copyPermissions(string $sourcePath, string $targetPath): void
    {
        if (fileperms($sourcePath) != fileperms($targetPath)) {
            $this->setPermissions($targetPath, (string) fileperms($sourcePath), "");
        }
    }

    public function getTotalSize(string $path): int
    {
        return (int) disk_total_space($path);
    }
}