<?php

namespace App\Libraries\Disk;

use Illuminate\Support\Facades\Log;
use Exception;

class DiskTransferService
{
    protected function resolveRealParentPath(string $path): string
    {
        $parentPath = dirname($path);
        if (!is_dir($parentPath)) {
            return $path;
        }

        $realParentPath = realpath($parentPath);
        $partialChildPath = substr($path, strlen($realParentPath));

        return $realParentPath . $partialChildPath;
    }

    /** 
     * @param TransferMode::* $mode
     * 
     * @return TransferMode::*
     */
    public function transferFile(string $sourcePath, string $targetPath, int $mode, bool $overwrite = false): int
    {
        $diskProviderService = resolve("DiskProviderService");
        $sourcePath = $this->resolveRealParentPath($sourcePath);
        $targetPath = $this->resolveRealParentPath($targetPath);

        Log::debug(sprintf("%s [%s] > [%s]", TransferMode::toString($mode), $sourcePath, $targetPath));

        $originalSize = $diskProviderService->getFileSize($sourcePath);

        if ($sourcePath == $targetPath) {
            throw new Exception("Source and Destination can't be the same: " . $sourcePath);
        }

        if (dirname($sourcePath) == dirname($targetPath)) {
            if (($mode & TransferMode::MOVE) == TransferMode::MOVE) {
                $this->tryMoveFileVerified($sourcePath, $targetPath, $originalSize);
                return TransferMode::MOVE;
            }
        }

        if ($diskProviderService->isParentPath($sourcePath, $targetPath)) {
            throw new Exception(sprintf("Destination cannot be a child of the source [%s] => [%s]", $sourcePath, $targetPath));
        }

        $this->clearTargetPath($targetPath, $overwrite);

        if (($mode & TransferMode::HARDLINK) == TransferMode::HARDLINK) {
            if ($diskProviderService->tryCreateHardLink($sourcePath, $targetPath)) {
                return TransferMode::HARDLINK;
            }

            if (($mode & TransferMode::COPY) != TransferMode::COPY) {
                throw new Exception(sprintf("Hardlinking from '%s' to '%s' failed", $sourcePath, $targetPath));
            }
        }

        if (($mode & TransferMode::COPY) == TransferMode::COPY) {
            $this->tryCopyFileVerified($sourcePath, $targetPath, $originalSize);
            return TransferMode::COPY;
        }
        
        if (($mode & TransferMode::MOVE) == TransferMode::MOVE) {
            $this->tryMoveFileVerified($sourcePath, $targetPath, $originalSize);
            return TransferMode::MOVE;
        }

        return TransferMode::NONE;
    }

    protected function clearTargetPath(string $targetPath, bool $overwrite): void
    {
        if (is_file($targetPath)) {
            if ($overwrite) {
                resolve("DiskProviderService")->deleteFile($targetPath);
            } else {
                throw new Exception("Destination already exists: " . $targetPath);
            }
        }
    }

    protected function tryMoveFileVerified(string $sourcePath, string $targetPath, int $originalSize): void
    {
        try {
            $service = resolve("DiskProviderService");
            $service->moveFile($sourcePath, $targetPath);

            $targetSize = $service->getFileSize($targetPath);

            if ($originalSize != $targetSize) {
                throw new Exception(sprintf("File move incomplete, data loss may have occured.  [%s] was %d bytes long instead of the expected %d",
                    $targetPath, $targetSize, $originalSize));
            }
        } catch (Exception $e) {
            $this->rollbackPartialMove($sourcePath, $targetPath);

            throw $e;
        }
    }

    protected function tryCopyFileVerified(string $sourcePath, string $targetPath, int $originalSize): void
    {
        try {
            $service = resolve("DiskProviderService");
            $service->copyFile($sourcePath, $targetPath);

            $targetSize = $service->getFileSize($targetPath);

            if ($originalSize != $targetSize) {
                throw new Exception(sprintf("File copy incomplete.  [%s] was %d bytes long instead of the expected %d",
                    $targetPath, $targetSize, $originalSize));
            }
        } catch (Exception $e) {
            $this->rollbackCopy($sourcePath, $targetPath);

            throw $e;
        }
    }

    protected function rollbackPartialMove(string $sourcePath, string $targetPath): void
    {
        try {
            Log::debug(sprintf("Rolling back incomplete file move [%s] to [%s]", $sourcePath, $targetPath));

            $this->waitForIO();

            if (is_file($sourcePath)) {
                resolve("DiskProviderService")->deleteFile($targetPath);
            } else {
                Log::error(sprintf("Failed to properly rollback the file move [%s] to [%s], incomplete file may be left in target path.",
                    $sourcePath, $targetPath));
            }
        } catch (Exception $e) {
            Log::error(sprintf("Failed to properly rollback the file move [%s] to [%s], incomplete file may be left in target path.",
                $sourcePath, $targetPath), ['exception' => $e]);
        }
    }

    protected function rollbackCopy(string $sourcePath, string $targetPath): void
    {
        try {
            Log::debug(sprintf("Rolling back file copy [%s] to [%s]", $sourcePath, $targetPath));

            $this->waitForIO();

            if (is_file($sourcePath)) {
                resolve("DiskProviderService")->deleteFile($targetPath);
            }
        } catch (Exception $e) {
            Log::error(sprintf("Failed to properly rollback the file copy [%s] to [%s], file may be left in target path.",
                $sourcePath, $targetPath), ['exception' => $e]);
        }
    }

    protected function waitForIO(): void
    {
        //Delay to give the IO stack time to recover
        sleep(3);
    }
}