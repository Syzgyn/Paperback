<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\Disk\OsPath;
use App\Libraries\Disk\TransferMode;
use App\Libraries\MediaFiles\Events\IssueFolderCreatedEvent;
use App\Libraries\Organizer\FileNameBuilder;
use App\Libraries\Parser\LocalIssue;
use App\Models\Comic;
use App\Models\Issue;
use App\Models\IssueFile;
use Exception;
use Illuminate\Support\Facades\Log;

class IssueFileMovingService
{
    public function moveIssueFileWithComic(IssueFile $issueFile, Comic $comic): IssueFile
    {
        if ($issueFile->path == null) {
            throw new Exception("Invalid file path");
            
        }
        /** @var Issue[] */
        $issues = Issue::whereIssueFile($issueFile->id)->get()->all();
        $filePath = FileNameBuilder::buildFilePath($issues, $comic, $issueFile, pathinfo($issueFile->path, PATHINFO_EXTENSION));

        $this->ensureIssueFolder($issueFile, $comic, $filePath);

        Log::debug(sprintf("Renaming issue file: %s to %s", (string) $issueFile, $filePath));

        return $this->transferFile($issueFile, $comic, $issues, $filePath, TransferMode::MOVE);
    }

    public function moveIssueFile(IssueFile $issueFile, LocalIssue $localIssue): IssueFile
    {
        if ($localIssue->comic == null) {
            throw new Exception("Missing comic");
        }

        if ($issueFile->path == null) {
            throw new Exception("Invalid file path");
        }

        $filePath = FileNameBuilder::buildFilePath($localIssue->issues, $localIssue->comic, $issueFile, pathinfo($issueFile->path, PATHINFO_EXTENSION));

        $this->ensureIssueFolder($issueFile, $localIssue->comic, $filePath);

        Log::debug(sprintf("Moving issue file: %s to %s", $issueFile->path, $filePath));

        return $this->transferFile($issueFile, $localIssue->comic, $localIssue->issues, $filePath, TransferMode::MOVE);
    }

    public function copyIssueFile(IssueFile $issueFile, LocalIssue $localIssue): IssueFile
    {
        if ($localIssue->comic == null) {
            throw new Exception("Missing comic");
        }

        if ($issueFile->path == null) {
            throw new Exception("Invalid file path");
        }

        $filePath = FileNameBuilder::buildFilePath($localIssue->issues, $localIssue->comic, $issueFile, pathinfo($issueFile->path, PATHINFO_EXTENSION));

        $this->ensureIssueFolder($issueFile, $localIssue->comic, $filePath);

        if (resolve("AppSettings")->get("mediamanagement", "copyUsingHardlinks")) {
            Log::debug(sprintf("Hardlinking issue file: %s to %s", $issueFile->path, $filePath));
            return $this->transferFile($issueFile, $localIssue->comic, $localIssue->issues, $filePath, TransferMode::HARDLINK_OR_COPY);
        }

        Log::debug(sprintf("Copying issue file: %s to %s", $issueFile->path, $filePath));
        return $this->transferFile($issueFile, $localIssue->comic, $localIssue->issues, $filePath, TransferMode::COPY);
    }

    /**
     * @param Issue[] $issues 
     * @param TransferMode::* $mode 
     */
    protected function transferFile(IssueFile $issueFile, Comic $comic, array $issues, string $destinationFilePath, int $mode): IssueFile
    {
        $issueFilePath = $issueFile->path ?? $comic->path . DIRECTORY_SEPARATOR . ($issueFile->relative_path ?? "");

        if ($issueFilePath == null || !is_file($issueFilePath)) {
            throw new Exception("Issue file path does not exist:" . $issueFilePath);
        }

        if ($issueFilePath == $destinationFilePath) {
            throw new Exception("File not moved, source and destination are the same");
        }

        resolve("DiskTransferService")->transferFile($issueFilePath, $destinationFilePath, $mode);

        $issueFile->relative_path = rtrim(substr($destinationFilePath, strlen($comic->path)), DIRECTORY_SEPARATOR);
        $issueFile->save();

        resolve("DiskProviderService")->setPermissionsFromConfig($destinationFilePath);

        return $issueFile;
    }

    protected function ensureIssueFolder(IssueFile $issueFile, Comic $comic, string $filePath): void
    {
        $issueFolder = dirname($filePath);
        $comicFolder = $comic->path;
        $rootFolder = (new OsPath($comicFolder))->getDirectory()->getPath();

        if (!is_dir($rootFolder)) {
            throw new Exception(sprintf("Root folder %s was not found", $rootFolder));
        }

        $changed = false;
        $event = new IssueFolderCreatedEvent($comic, $issueFile);

        if (!is_dir($comicFolder)) {
            $this->createFolder($comicFolder);
            $event->comicFolder = $comicFolder;
            $changed = true;
        }

        if ($comicFolder != $issueFolder && !is_dir($issueFolder)) {
            $this->createFolder($issueFolder);
            $event->issueFolder = $issueFolder;
            $changed = true;
        }

        if ($changed) {
            event($event);
        }
    }

    protected function createFolder(string $dirName): void
    {
        if (empty($dirName)) {
            throw new Exception("Invalid directory name: " . $dirName);
        }

        $diskProvider = resolve("DiskProviderService");
        $diskProvider->ensureFolder($dirName);
        $diskProvider->setPermissionsFromConfig($dirName);
    }
}