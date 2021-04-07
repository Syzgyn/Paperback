<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Paperback</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
      .app {
        overflow: hidden;
        height: 100%; /* needed for proper layout */
      }

      @media only screen and (max-width: 768px) {
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          height: auto;
        }
      }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        window.Sonarr = {
            urlBase: '', 
            version: '0.1',
            apiRoot: '/api',
        };
    </script>
    <script src="{{ asset('assets/bundle/index.js') }}"></script>
</body>
</html>
