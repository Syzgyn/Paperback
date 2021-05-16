<?php

namespace App\Libraries\Providers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Exception;

abstract class ProviderController extends Controller
{
    protected ProviderRepository $repo;

    public function index(): ResourceCollection
    {
        $items = $this->repo->all();
        return $this->repo->collection($items);
    }

    public function show(ProviderModelBase $model): JsonResource
    {
        return $this->repo->resource($model);
    }

    public function store(Request $request): JsonResource
    {
        $input = $this->validate($request, $this->repo->validationRules());
        $model = $this->repo->make($input);

        if ($model->enable && $request->query('forceSave') == false) {
            $model->test();
        }
        $model->save();
        return $this->repo->resource($model);
    }

    public function update(Request $request, ProviderModelBase $model): JsonResource
    {
        $input = $this->validate($request, $this->repo->validationRules());
        $model->fill($input);
        if ($model->enable && $request->query('forceSave') == false) {
            $model->test();
        }
        $model->save();

        return $this->repo->resource($model);
    }

    public function destroy(ProviderModelBase $model): JsonResponse
    {
        $model->delete();

        return response()->json(['status' => 'OK']);
    }

    public function schema(): ResourceCollection
    {
        $schemas = $this->repo->schema();
        return $this->repo->collection($schemas);
    }

    public function test(Request $request): array
    {
        $input = $this->validateRequest($request);
        return $this->repo->test($input);
    }

    public function testall(): void
    {
        //TODO: Collect results
        $models = $this->repo->all();

        /** @var ProviderModelBase $model */
        foreach($models as $model) {
            $model->test();
        }
    }

    public function action(string $action, Request $request): mixed
    {
        //$input = $this->validateRequest($request);
        $model = $this->repo->make($request->all());
        
        return $model->requestAction($action);
    }

    public function validateRequest(Request $request): array
    {
        return parent::validate($request, $this->repo->validationRules(), $this->repo->validationMessages());
    }
}
