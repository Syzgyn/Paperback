<?php

namespace App\Libraries\Providers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\IndexerRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class ProviderController extends Controller
{
    protected ProviderRepository $repo;

    public function index()
    {
        $items = $this->repo->all();
        return $this->repo->collection($items);
    }

    public function show(ProviderModelBase $model)
    {
        return $this->repo->resource($model);
    }

    public function store(Request $request)
    {
        $input = $this->validate($request, $this->repo->validationRules());
        $model = $this->repo->make($input);

        if ($model->enable && $request->query('forceSave') == false) {
            $model->test();
        }
        $model->save();
        return $this->repo->resource($model);
    }

    public function update(Request $request, ProviderModelBase $model)
    {
        $input = $this->validate($request, $this->repo->validationRules());
        $model->fill($input);
        if ($model->enable && $request->query('forceSave') == false) {
            $model->test();
        }
        $model->save();

        return $this->repo->resource($model);
    }

    public function destroy(ProviderModelBase $model)
    {
        $model->delete();

        return response()->json(['status' => 'OK']);
    }

    public function schema()
    {
        $schemas = $this->repo->schema();
        return $this->repo->collection($schemas);
    }

    public function test(Request $request)
    {
        $input = $this->validateRequest($request);
        return $this->repo->test($input);
    }

    public function testall()
    {
        //TODO: Collect results
        $models = $this->repo->all();
        foreach($models as $model) {
            $model->test();
        }
    }

    public function action(string $action, Request $request)
    {
        //$input = $this->validateRequest($request);
        $model = $this->repo->make($request->all());
        
        return $model->requestAction($action);
    }

    public function validateRequest(Request $request)
    {
        return parent::validate($request, $this->repo->validationRules(), $this->repo->validationMessages());
    }
}