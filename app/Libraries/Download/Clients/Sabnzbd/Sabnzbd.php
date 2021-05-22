<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Disk\OsPath;
use Exception;
use App\Libraries\Download\UsenetClientModelBase;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Download\DownloadClientInfo;
use App\Libraries\Download\DownloadClientItemClientInfo;

/**
 * App\Libraries\Download\Clients\Sabnzbd\Sabnzbd
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property SabnzbdSettings $settings
 * @property string|null $settings_schema
 * @property bool|null $enable
 * @property int $priority
 * @property-read array $fields
 * @property-read mixed $foo
 * @property-read string $settings_schema_class_name
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereEnable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereSettingsSchema($value)
 * @mixin \Eloquent
 */
class Sabnzbd extends UsenetClientModelBase
{
    protected string $versionRegex = "/(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+|x)/";

    protected $implementation = 'Sabnzbd';
    protected $settingsSchema = 'SabnzbdSettings';
    public string $name = "SABnzbd";
    protected static ?SabnzbdProxy $proxy;

    protected static function getProxy(): SabnzbdProxy
    {
        if (!isset(self::$proxy)) {
            self::$proxy = new SabnzbdProxy();
        }

        return self::$proxy;
    }

    public function getSettingsSchemaClassNameAttribute(): string
    {
        return SabnzbdSettings::class;
    }

    protected function addFromNzbFile(RemoteIssue $remoteIssue, string $filename, string $fileContent): string
    {
        $category = $this->settings->category;
        $priority = $remoteIssue->isRecentIssue() ? $this->settings->recentPriority : $this->settings->olderPriority;

        $response = self::getProxy()->downloadNzb($fileContent, $filename, $category, $priority, $this->settings);

        if (empty($response->ids)) {
            throw new Exception("SABnzbd rejected the NZB for an unknown reason");
        }

        return $response->ids[0];
    }

    /** @return DownloadClientItem[] */
    protected function getQueue(): array
    {
        $sabQueue = self::getProxy()->getQueue(0, 0, $this->settings);
        $queueItems = [];

        /** @var SabnzbdQueueItem $sabQueueItem */
        foreach($sabQueue->items as $sabQueueItem) {
            if ($sabQueueItem->status == "Deleted") {
                continue;
            }

            $queueItem = new DownloadClientItem();
            $queueItem->downloadClientInfo = DownloadClientItemClientInfo::fromDownloadClient($this);
            $queueItem->downloadId = $sabQueueItem->id;
            $queueItem->category = $sabQueueItem->category;
            $queueItem->title = $sabQueueItem->title;
            $queueItem->totalSize = (int)$sabQueueItem->size * 1024 * 1024;
            $queueItem->remainingSize = (int)$sabQueueItem->sizeLeft * 1024 * 1024;
            $queueItem->remainingTime = $sabQueueItem->timeLeft;
            $queueItem->canBeRemoved = true;
            $queueItem->canMoveFiles = true;

            if (($sabQueue->paused && $sabQueueItem->priority != "Forced") ||
                $sabQueueItem->status == "Paused"
            ) {
                $queueItem->status = "Paused";
                $queueItem->remainingTime = null;
            } elseif ($sabQueueItem->status == "Queued" ||
                $sabQueueItem->status == "Grabbing" ||
                $sabQueueItem->status == "Propagating"
            ) {
                $queueItem->status = "Queued";
            } else {
                $queueItem->status = "Downloading";
            }

            if (!empty($queueItem->title) && str_starts_with($queueItem->title, "ENCRYPTED /")) {
                $queueItem->title = substr($queueItem->title, 11);
                $queueItem->isEncrypted = true;
            }

            $queueItems[] = $queueItem;
        }

        return $queueItems;
    }

    /** @return DownloadClientItem[] */
    protected function getHistory(): array
    {
        $sabHistory = self::getProxy()->getHistory(0, 60, $this->settings->category, $this->settings);

        $historyItems = [];

        foreach ($sabHistory->items as $sabHistoryItem) {
            if ($sabHistoryItem->status == "Deleted") {
                continue;
            }

            $historyItem = new DownloadClientItem();
            $historyItem->downloadClientInfo = DownloadClientItemClientInfo::fromDownloadClient($this);
            $historyItem->downloadId = $sabHistoryItem->id;
            $historyItem->category = $sabHistoryItem->category;
            $historyItem->title = $sabHistoryItem->title;
            $historyItem->totalSize = $sabHistoryItem->size;
            $historyItem->remainingSize = 0;
            $historyItem->remainingTime = 0;
            $historyItem->message = $sabHistoryItem->failMessage;
            $historyItem->canBeRemoved = true;
            $historyItem->canMoveFiles = true;

            if ($sabHistoryItem->status == "Failed") {
                if (!empty($sabHistoryItem->failMessage) &&
                    strcasecmp($sabHistoryItem->failMessage, "Unpacking failed, write error or disk is full?") == 0
                ) {
                    $historyItem->status = "Warning";
                } else {
                    $historyItem->status = "Failed";
                }
            } elseif ($sabHistoryItem->status == "Completed") {
                $historyItem->status = "Completed";
            } else {
                $historyItem->status = "Downloading";
            }

            $outputPath = resolve('RemotePathMappingService')->remapRemoteToLocal($this->settings->host, new OsPath($sabHistoryItem->storage));

            if (!$outputPath->isEmpty()) {
                $historyItem->outputPath = $outputPath;
                $parent = $outputPath->getDirectory();

                while (!$parent->isEmpty()) {
                    if ($parent->getFilename() == $sabHistoryItem->title) {
                        $historyItem->outputPath = $parent;
                    }
                    $parent = $parent->getDirectory();
                }
            }
            
            $historyItems[] = $historyItem;
        }

        return $historyItems;
    }

    /** @return DownloadClientItem[] */
    public function getItems(): array
    {
        $items = $this->getQueue() + $this->getHistory();
        
        return array_filter($items, fn($i) => $i->category == $this->settings->category);
    }

    public function removeItem(DownloadClientItem $item, bool $deleteData): void
    {
        assert($item->downloadId != null);

        $queueClientItem = array_filter($this->getQueue(), fn($i) => $i->downloadId == $item->downloadId)[0] ?? null;

        if ($queueClientItem == null) {
            if ($deleteData && $item->status == "Completed") {
                $this->deleteItemData($item);
            }

            self::getProxy()->removeFrom("history", $item->downloadId, $deleteData, $this->settings);
        } else {
            self::getProxy()->removeFrom("queue", $item->downloadId, $deleteData, $this->settings);
        }
    }

    /** @return SabnzbdCategory[] */
    protected function getCategories(SabnzbdRemoteConfig $config): array
    {
        $completeDir = new OsPath($config->completeDir);

        if (!$completeDir->isRooted()) {
            if ($this->hasVersion(2, 0)) {
                $status = self::getProxy()->getFullStatus($this->settings);
                $completeDir = new OsPath($status->completeDir);
            } else {
                $queue = self::getProxy()->getQueue(0, 1, $this->settings);
                $defaultRootFolder = new OsPath($queue->defaultRootFolder);

                $completeDir = $defaultRootFolder->add($completeDir);
            }
        }

        $categories = [];

        foreach ($config->categories as $category) {
            assert($category->dir != null);

            $relativeDir = new OsPath(rtrim($category->dir, '*'));
            $category->fullPath = $completeDir->add($relativeDir);

            $categories[] = $category;
        }

        return $categories;
    }

    public function getStatus(): DownloadClientInfo
    {
        $config = self::getProxy()->getConfig($this->settings);
        $categories = $this->getCategories($config);

        $category = array_filter($categories, fn(SabnzbdCategory $c) => $c->name == $this->settings->category)[0] ?? null;

        if ($category == null) {
            $category = array_filter($categories, fn(SabnzbdCategory $c) => $c->name == '*')[0] ?? null;
        }

        $status = new DownloadClientInfo();
        $status->isLocalhost = $this->settings->host == "127.0.0.1" || $this->settings->host == "localhost";

        if ($category != null && $category->fullPath != null) {
            $status->outputRootFolders = [
                resolve('RemotePathMappingService')->remapRemoteToLocal($this->settings->host, $category->fullPath),
            ];
        }

        return $status;
    }

    protected function hasVersion(int $major, int $minor, int $patch = 0): bool
    {
        $rawVersion = self::getProxy()->getVersion($this->settings);
        $version = $this->parseVersion($rawVersion);

        if ($version == null) {
            return false;
        }

        if ($version['major'] > $major) {
            return true;
        } elseif ($version['major'] < $major) {
            return false;
        }

        if ($version['minor'] > $minor) {
            return true;
        } elseif ($version['minor'] < $minor) {
            return false;
        }

        if ($version['build'] > $patch) {
            return true;
        } elseif ($version['build'] < $patch) {
            return false;
        }

        return true;
    }

    protected function parseVersion(string $version): ?array
    {
        if (empty($version)) {
            return null;
        }

        preg_match($this->versionRegex, $version, $parsed);

        if (!empty($parsed)) {
            return $parsed;
        } elseif (strtolower($version) != "develop") {
            return null;
        }

        return [
            'major' => 1,
            'minor' => 1,
            'patch' => 0,
        ];
    }

    public function test(): void
    {
        $this->testConnectionAndVersion();
        $this->testAuthentication();
        $this->testGlobalConfig();
        $this->testCategory();
    }

    protected function testConnectionAndVersion(): void
    {
        $rawVersion = self::getProxy()->getVersion($this->settings);
        $version = $this->parseVersion($rawVersion);

        if ($version == null) {
            throw new Exception("Unknown Version: $rawVersion");
        }

        if (strtolower($rawVersion) == "devlop") {
            //TODO: Return warning
        }

        if ($version['major'] >= 1) {
            return;
        }

        if ($version['minor'] >= 7) {
            return;
        }

        throw new Exception("Version 0.7.0+ is required, but found: $rawVersion");
    }

    protected function testAuthentication(): void
    {
        try {
            self::getProxy()->getConfig($this->settings);
        } catch (Exception $e) {
            if (str_contains(strtolower($e->getMessage()), "api key incorrect")) {
                throw new Exception("API Key Incorrect");
            }

            if (str_contains(strtolower($e->getMessage()), "api key required")) {
                throw new Exception("API Key Required");
            }

            throw $e;
        }

        return;
    }

    protected function testGlobalConfig(): void
    {
        $config = self::getProxy()->getConfig($this->settings);

        if ($config->preCheck && !$this->hasVersion(1, 1)) {
            throw new Exception("Disable 'Check before download' option in Sabnzbd");
        }
    }

    protected function testCategory(): void
    {
        $config = self::getProxy()->getConfig($this->settings);
        $category = current(array_filter($config->categories, fn($c) => $c->name == $this->settings->category));

        if ($category != null && $category->dir !== null) {
            if (str_ends_with($category->dir, '*')) {
                throw new Exception("Enable Job folders");
            }
        } else {
            if (!empty($this->settings->category)) {
                throw new Exception("Category does not exist");
            }
        }

        assert($config->tvCategories != null);
        assert($config->movieCategories != null);
        assert($config->dateCategories != null);

        if ($config->enableTvSorting && $this->containsCategory($config->tvCategories, $this->settings->category)) {
            throw new Exception("Disable TV Sorting for category " . $this->settings->category);
        }

        if ($config->enableMovieSorting && $this->containsCategory($config->movieCategories, $this->settings->category)) {
            throw new Exception("Disable Movie Sorting for category " . $this->settings->category);
        }

        if ($config->enableDateSorting && $this->containsCategory($config->dateCategories, $this->settings->category)) {
            throw new Exception("Disable Date Sorting for category " . $this->settings->category);
        }
    }

    protected function containsCategory(array $categories, string $category): bool
    {
        if (empty($categories)) {
            return true;
        }

        if (empty($category)) {
            $category = "Default";
        }

        return in_array($category, $categories);
    }
}
