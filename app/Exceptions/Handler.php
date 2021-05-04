<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'error' => 'Entry for '.str_replace('App\\', '', $exception->getModel()).' not found', ], 404);
        }

        return parent::render($request, $exception);
    }

	protected function invalidJson($request, ValidationException $exception)
    {
        $data = $exception->validator->getData();
        $failedRules = $exception->validator->failed();
        $output = [];
        foreach($exception->errors() as $field => $message) {
            $output[] = [
                'propertyName' => $field,
                'errorMessage' => array_pop($message),
                'attemptedValue' => $data[$field] ?? null,
                'severity' => 'error',
                'errorCode' => array_keys($failedRules[$field])[0]
            ];
        }
        return response()->json($output, 400);
    }
}
