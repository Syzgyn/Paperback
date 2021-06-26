<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\Commands\CleanupRecycleBinCommand;
use App\Libraries\Disk\PathService;
use App\Libraries\Disk\TransferMode;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;
use SplFileInfo;

class RecycleBinService
{
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            CleanupRecycleBinCommand::class,
            [$this, 'handleCleanupRecycleBinCommand']
        );
    }

    public function handleCleanupRecycleBinCommand(CleanupRecycleBinCommand $event): void
    {
        $this->cleanup();
    }

    public function deleteFolder(string $path): void
    {
        if (is_file($path)) {
            $path = dirname($path);
        }

        Log::info(sprintf("Attempting to send '%s' to the recycle bin", $path));

        /** @var string */
        $recycleBin = resolve("AppSettings")->get("mediamanagement", "recycleBin");

        if (empty($recycleBin)) {
            Log::info("Recycling bin has not been configured, deleting permanently. " . $path);
            resolve("DiskProviderService")->deleteFolder($path);
            Log::debug("Folder has been permanently deleted: " . $path);
        } else {
            $destination = resolve("DiskProviderService")->combinePaths($recycleBin, pathinfo($path, PATHINFO_FILENAME));

            Log::debug(sprintf("Moving '%s' to '%s'", $path, $destination));
            resolve("DiskTransferService")->transferFolder($path, $destination, TransferMode::MOVE);
            $this->setLastWriteTime($destination);
            foreach (resolve("DiskProviderService")->getFilesRecursive($destination) as $file) {
                $this->setLastWriteTime($file);
            }

            Log::debug("Folder has been moved to the recycling bin: " . $destination);
        }
    }

    public function deleteFile(string $path, string $subfolder = ""): void
    {
        Log::debug("Attempting to send '$path' to the recycling bin");
        $diskProviderService = resolve("DiskProviderService");

        /** @var string */
        $recycleBin = resolve("AppSettings")->get("mediamanagement", "recycleBin");

        if (empty($recycleBin)) {
            Log::info("Recycling bin has not been configured, deleting permanently. " . $path);
            $diskProviderService->deleteFile($path);
            Log::debug("File has been permanently deleted: " . $path);
        } else {
            $fileInfo = new SplFileInfo($path);
            $destinationFolder = PathService::combine($recycleBin, $subfolder);
            $destination = PathService::combine($destinationFolder, $fileInfo->getFilename());

            if (!is_dir($destinationFolder)) {
                Log::debug("Creating folder $destinationFolder");
                $diskProviderService->createFolder($destinationFolder);
            }

            $index = 1;
            while (is_file($destination)) {
                $index++;

                if (empty($fileInfo->getExtension())) {
                    $destination = PathService::combine($destinationFolder, $fileInfo->getFilename() . "_" . $index);
                } else {
                    $destination = PathService::combine($destinationFolder, $fileInfo->getBasename() . "_" . $index . "." . $fileInfo->getExtension());
                }
            }

            try {
                Log::debug("Moving '$path' to '$destination'");
                resolve("DiskTransferService")->transferFile($path, $destination, TransferMode::MOVE);
            } catch (Exception $e) {
                Log::error("Unable to move '$path' to the recycling bin: '$destination'", ['exception' => $e]);
                throw $e;
            }

            $this->setLastWriteTime($destination);

            Log::debug("File has been moved to the recycling bin: $destination");
        }
    }

    public function empty(): void
    {
        /** @var string */
        $recycleBin = resolve("AppSettings")->get("mediamanagement", "recycleBin");

        if (empty($recycleBin)) {
            Log::info("Recycling bin has not been configured, cannot empty.");
            return;
        }

        Log::info("Removing all items from the recycling bin");
        resolve("DiskProviderService")->emptyFolder($recycleBin);
        Log::debug("Recycling bin has been emptied.");
    }

    public function cleanup(): void
    {
        /** @var string */
        $recycleBin = resolve("AppSettings")->get("mediamanagement", "recycleBin");

        if (empty($recycleBin)) {
            Log::info("Recycling bin has not been configured, cannot cleanup.");
            return;
        }

        /** @var int */
        $cleanupDays = resolve("AppSettings")->get("mediamanagement", "recycleBinCleanupDays");

        if ($cleanupDays == 0) {
            Log::info("Automatic cleanup of recycling bin is disabled.");
            return;
        }

        Log::info("Removing items older than $cleanupDays days from the recycling bin");
        $diskProviderService = resolve("DiskProviderService");
        foreach ($diskProviderService->getFilesRecursive($recycleBin) as $file) {
            if ($diskProviderService->fileGetLastWrite($file) > now()->subDays($cleanupDays)) {
                Log::debug("File hasn't expired yet, skipping: $file");
                continue;
            }

            $diskProviderService->deleteFile($file);
        }

        $diskProviderService->removeEmptySubfolders($recycleBin);

        Log::debug("Recycling bin has been cleaned up.");
    }

    protected function setLastWriteTime(string $path): void
    {
        try {
            resolve("DiskProviderService")->setLastWriteTime($path);
        } catch (Exception $e) {
        }
    }
}