<?php

namespace App\Http\Controllers;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\Queue\Queue;
use App\Models\DownloadClient;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QueueController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $queue = resolve("QueueService")->getPagedQueue($request);
        return response()->json($queue);
    }

    public function details(Request $request): JsonResponse
    {
        $queue = resolve("QueueService")->getQueue();

        /** @var ?int */
        $comicId = $request->input('comicId');
        /** @var ?string */
        $issueIds = $request->input('issueIds');

        if ($comicId) {
            return response()->json(
                array_filter($queue, fn(Queue $q) => $q->comic?->cvid == $comicId)
            );
        }

        if ($issueIds) {
            $issueIds = explode(",", $issueIds);
            return response()->json(
                array_filter($queue, fn(Queue $q) => $q->issue != null && in_array($q->issue->cvid, $issueIds))
            );
        }

        return response()->json($queue);
    }
    
    public function status(Request $request): JsonResponse
    {
        $status = resolve('QueueService')->getQueueStatus();
        return response()->json($status);
    }

    public function deleteOne(Request $request, int $id): JsonResponse
    {
        $removeFromClient = (bool) $request->input("removeFromClient", true);
        $blacklist = (bool) $request->input("blacklist", false);

        $trackedDownload = $this->removeTrackedDownload($id, $removeFromClient, $blacklist);
        
        if ($trackedDownload != null &&
            $trackedDownload->downloadItem != null &&
            $trackedDownload->downloadItem->downloadId != null) {
            resolve("TrackedDownloadService")->stopTracking([$trackedDownload->downloadItem->downloadId]);
        }

        return response()->json([]);
    }

    public function deleteBulk(Request $request): JsonResponse
    {
        //More weirdness to get raw json data
        $ids = (array) json_decode(rtrim(urldecode((string) $request->getContent()), "="), true);
        $removeFromClient = (bool) $request->input("removeFromClient", true);
        $blacklist = (bool) $request->input("blacklist", false);

        $removeIds = [];

        /** @var int $id */
        foreach ($ids as $id) {
            $trackedDownload = $this->removeTrackedDownload($id, $removeFromClient, $blacklist);
        
            if ($trackedDownload != null &&
                $trackedDownload->downloadItem != null &&
                $trackedDownload->downloadItem->downloadId != null) {
                    $removeIds[] = $trackedDownload->downloadItem->downloadId;
                }
        }
        
        resolve("TrackedDownloadService")->stopTracking($removeIds);
        
        return response()->json([]);
    }

    protected function removeTrackedDownload(int $queueId, bool $removeFromClient, bool $blacklist): ?TrackedDownload
    {
        $queueItem = resolve("QueueService")->find($queueId);

        if ($queueItem == null || $queueItem->downloadId == null) {
            throw new \Exception("Queue item not found");
        }

        /** @var ?TrackedDownload */
        $trackedDownload = resolve("TrackedDownloadService")->find($queueItem->downloadId);

        if ($trackedDownload == null) {
            throw new \Exception("Tracked Download not found");
        }

        if ($removeFromClient) {
            $downloadClient = DownloadClient::find($trackedDownload->downloadClient);

            if ($downloadClient == null || $trackedDownload->downloadItem == null) {
                throw new Exception("Bad request: Unable to find download client");
            }

            $downloadClient->removeItem($trackedDownload->downloadItem, true);
        }

        if ($blacklist) {
            assert($trackedDownload->downloadItem != null && $trackedDownload->downloadItem->downloadId != null);
            resolve("FailedDownloadService")->markDownloadAsFailed($trackedDownload->downloadItem->downloadId);
        }

        if (!$removeFromClient && !$blacklist) {

            if (!resolve("IgnoredDownloadService")->ignoreDownload($trackedDownload)) {
                return null;
            }
        }

        return $trackedDownload;
    }
}
