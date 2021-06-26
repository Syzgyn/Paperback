<?php

namespace App\Libraries\MediaFiles;

use App\Events\ComicDeletedEvent;
use App\Libraries\Disk\PathService;
use App\Libraries\MediaFiles\Events\IssueFileDeletedEvent;
use App\Models\Comic;
use App\Models\IssueFile;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;

class IssueFileDeletionService
{
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            ComicDeletedEvent::class,
            [$this, 'handleComicDeletedEvent']
        );

        $events->listen(
            IssueFileDeletedEvent::class,
            [$this, 'handleIssueFileDeletedEvent']
        );
    }

    //TODO: Make async
    public function handleComicDeletedEvent(ComicDeletedEvent $event): void
    {
        if ($event->deleteFiles) {
            $diskProviderService = resolve("DiskProviderService");
            $comic = $event->comic;
            $allComics = Comic::all(['cvid', 'path']);

            /** @var Comic $c */
            foreach ($allComics as $c) {
                if ($c->cvid == $comic->cvid) {
                    continue;
                }

                if ($diskProviderService->isParentPath($comic->path, $c->path)) {
                    Log::error(sprintf("Comic path '%s' is parent of another comic, not deleting files.", $comic->path));
                    return;
                }

                if ($comic->path == $c->path) {
                    Log::error(sprintf("Comic path '%s' is the same as another comic, not deleting files.", $comic->path));
                    return;
                }
            }

            if (is_dir($comic->path)) {
                resolve("RecycleBinService")->deleteFolder($event->comic->path);
            }
        }
    }

    public function handleIssueFileDeletedEvent(IssueFileDeletedEvent $event): void
    {
        if (resolve("AppSettings")->get("mediamanagement", "deleteEmptyFolders")) {
            /** @var \App\Models\Comic */
            $comic = $event->issueFile->comic;
            $comicPath = $comic->path;
            $folder = dirname($event->issueFile->path ?? "");

            $diskProviderService = resolve("DiskProviderService");

            while (PathService::isParentPath($comicPath, $folder)) {
                if (is_dir($folder)) {
                    $diskProviderService->removeEmptySubfolders($folder);
                }

                $folder = dirname($folder);
            }

            $diskProviderService->removeEmptySubfolders($comicPath);

            if ($diskProviderService->folderEmpty($comicPath)) {
                $diskProviderService->deleteFolder($comicPath);
            }
        }
    }

    public function deleteIssueFile(Comic $comic, IssueFile $issueFile): void
    {
        if ($issueFile->relative_path == null) {
            return;
        }

        $diskProviderService = resolve("DiskProviderService");

        $fullPath = $comic->path . DIRECTORY_SEPARATOR . $issueFile->relative_path;
        $rootFolder = dirname($comic->path);

        if (!is_dir($rootFolder)) {
            Log::warning(sprintf("Comic's root folder (%s) doesn't exist.", $rootFolder));
            throw new Exception(sprintf("Comic's root folder (%s) doesn't exist.", $rootFolder));
        }

        if (empty($diskProviderService->getDirectories($rootFolder))) {
            Log::warning(sprintf("Comic's root folder (%s) is empty.", $rootFolder));
            throw new Exception(sprintf("Comic's root folder (%s) is empty.", $rootFolder));
        }

        if (is_dir($comic->path) && is_file($fullPath)) {
            Log::info("Deleting issue file: " . $fullPath);

            $subfolder = $diskProviderService->getRelativePath(dirname($comic->path), dirname($fullPath));

            try {
                resolve("RecycleBinService")->deleteFile($fullPath, $subfolder);
            } catch (Exception $e) {
                Log::error("Unable to delete issue file", ['exception' => $e]);
                throw new Exception("Unable to delete issue file");
            }

            $issueFile->delete();
        }
    }
}