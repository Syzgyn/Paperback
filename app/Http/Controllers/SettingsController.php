<?php

namespace App\Http\Controllers;

use App\Repositories\AppSettingsRepository;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    protected AppSettingsRepository $settings;

    public function __construct()
    {
        /** @var AppSettingsRepository */
        $this->settings = resolve('AppSettings');
        $this->middleware('api')->except('ConvertEmptyStringsToNull');
    }

    public function index(): int|float|bool|string|array
    {
        return $this->settings->get();
    }

    public function category(Request $request, string $category): array
    {
        /** @var array */
        return $this->settings->get($category);
    }

    public function property(Request $request, string $category, string $property): int|float|bool|string
    {
        /** @var scalar */
        return $this->settings->get($category, $property);
    }

    public function update(Request $request, string $category): array
    {
        $config = [$category => $request->all()];

        if ($this->settings->bulkSet($config)) {
            /** @var array */
            return $this->settings->get($category);
        }

        throw new Exception("Unable to save config");
    }

    public function namingExamples(Request $request): JsonResponse
    {
        $namingConfig = $request->all();

        if (!isset($namingConfig['renameIssues'])) {
            $namingConfig = null;
        }
        $service = resolve("FileNameSampleService");
        
        $output = [];

        $output['singleIssueExample'] = $service->getStandardSample($namingConfig)->fileName;
        $output['multiIssueExample'] = $service->getMultiIssueSample($namingConfig)->fileName;
        $output['comicFolderExample'] = $service->getComicFolderSample($namingConfig);

        return response()->json($output);
    }
}
