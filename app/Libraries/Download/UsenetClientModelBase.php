<?php

namespace App\Libraries\Download;

use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Http\HttpRequest;
use GuzzleHttp\Exception\TransferException;
use Exception;
use Illuminate\Support\Facades\Log;

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
            $response = resolve('HttpClient')->get($request);
            $fileContent = $response->content;

            Log::debug(sprintf(
                "Downloaded nzb for issue '%s' finished (%d bytes from %s)",
                $remoteIssue->release->title,
                strlen($fileContent),
                $url
            ));
        } catch (TransferException $e) {
            if (!isset($response)) {
                Log::error("Unable to get response object from " . $url);
                throw $e;
            }

            if ($response->statusCode == 404) {
                Log::error(
                    sprintf("Downloading nzb for issue '%s' failed since it no longer exists (%s)", $remoteIssue->release->title, $url),
                    ['exception' => $e],
                );
                throw $e;
            }

            if ($response->statusCode == 429) {
                Log::error("API Grab limit reached for " . $url);
            } else {
                Log::error(
                    sprintf("Downloading nzb for issue '%s' failed (%s)", $remoteIssue->release->title, $url),
                    ['exception' => $e],
                );
            }

            throw $e;
        }

        resolve('NzbValidationService')->validate($filename, $fileContent);

        Log::info(sprintf("Adding report [%s] to the queue.", $remoteIssue->release->title));

        return $this->addFromNzbFile($remoteIssue, $filename, $fileContent);
    }
}
