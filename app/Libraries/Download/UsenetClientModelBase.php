<?php

namespace App\Libraries\Download;

use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Http\HttpRequest;
use GuzzleHttp\Exception\TransferException;
use Exception;

abstract class UsenetClientModelBase extends DownloadClientModelBase
{
    const PROTOCOL = "usenet";

    protected abstract function addFromNzbFile(RemoteIssue $remoteIssue, string $filename, string $fileContent): string;

    public function download(RemoteIssue $remoteIssue): string
    {
        if (
            $remoteIssue->release == null || 
            $remoteIssue->release->title == null ||
            $remoteIssue->release->downloadUrl == null
        ) {
            throw new Exception("Unable to download, no relase found");
            
        }

        $url = $remoteIssue->release->downloadUrl;
        $filename = $remoteIssue->release->title . ".nzb"; //TODO: Implement fileNameBuilder

        $fileContent = null;

        try {
            $request = new HttpRequest($url);
            $request->rateLimitKey = (string) $remoteIssue->release->indexerId;
            $fileContent = resolve('HttpClient')->get($request)->content;

            //TODO: log
        } catch (TransferException $e) {
            //TODO: log and expand error catching
            throw $e;
        }

        resolve('NzbValidationService')->validate($filename, $fileContent);
        //TODO: log
        return $this->addFromNzbFile($remoteIssue, $filename, $fileContent);
    }
}
