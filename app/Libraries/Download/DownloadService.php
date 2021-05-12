<?php

namespace App\Libraries\Download;

use App\Exceptions\DownloadClientRejectedReleaseException;
use App\Exceptions\ReleaseDownloadException;
use App\Exceptions\ReleaseUnavailableException;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Http\HttpUri;
use App\Models\DownloadClient;
use Exception;

class DownloadService
{
    public function downloadReport(RemoteIssue $remoteIssue)
    {
        if (empty($remoteIssue->comic)) {
            throw new Exception("Release is missing matching comic");
        }
        
        if (empty($remoteIssue->issues)) {
            throw new Exception("Release is missing matching issues");
        }

        $downloadTitle = $remoteIssue->release->title;
        $downloadClient = DownloadClient::getDownloadClient($remoteIssue->release->downloadProtocol);

        if ($downloadClient == null) {
            throw new Exception($remoteIssue->release->downloadProtocol . " Download client isn't configured yet");
        }

        if (!empty($remoteIssue->release->downloadUrl) && !str_starts_with($remoteIssue->release->downloadUrl, "magnet:")) {
            $url = new HttpUri($remoteIssue->release->downloadUrl);
            //TODO: Pulse 2 seconds between pulls
        }

        $downloadClientId = null;

        try {
            $downloadClientId = $downloadClient->download($remoteIssue);
        } catch (ReleaseUnavailableException $e) {
            throw $e;
        } catch (DownloadClientRejectedReleaseException $e) {
            throw $e;
        } catch (ReleaseDownloadException $e) {
            throw $e;
        }

        $issueGrabbedEvent = new IssueGrabbedEvent($remoteIssue);
        $issueGrabbedEvent->downloadClient = $downloadClient->implementation;
        $issueGrabbedEvent->downloadClientId = $downloadClient->id;
        $issueGrabbedEvent->downloadClientName = $downloadClient->name;

        if ($downloadClientId) {
            $issueGrabbedEvent->downloadId = $downloadClientId;
        }

        //TODO: Log
        //TODO: publish event
    }
}
