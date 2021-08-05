<?php

namespace App\Libraries\Disk;

use Exception;
use Illuminate\Support\Facades\Log;

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
        if (strlen($mask) === 3) {
            $mask = "0" . $mask;
        }

        Log::debug("Setting permissions for $path: $mask, $group");
        
        if (!chmod($path, intval($mask, 8))) {
            throw new Exception("Error setting permissions: " . $path);
        }

        if (is_numeric($group)) {
            $group = intval($group);
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

    public function tryCreateHardLink(string $source, string $destination): bool
    {
        try {
            if (is_link($source)) {
                return false;
            }

            return link($source, $destination);
        } catch (Exception $e) {
            Log::debug(sprintf("Hardlink '%s' to '%s' failed.", $source, $destination), ['exception' => $e]);
            return false;
        }
    }
}