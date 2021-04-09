<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingsController extends Controller
{
    protected $settings;

    public function __construct()
    {
        $this->settings = resolve('AppSettings');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->settings->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function category(Request $request, string $category)
    {
        return $this->settings->get($category);
    }

    public function property(Request $request, string $category, string $property)
    {
        return $this->settings->get($category, $property);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $category)
    {
        $config = [$category => $request->all()];

        if ($this->settings->bulkSet($config)) {
            return $this->settings->get($category);
        }

        throw new Exception("Unable to save config");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
