const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const cssVarsFiles = [
  './resources/js/Styles/Variables/colors.js',
//  '../src/Styles/Variables/dimensions',
//  '../src/Styles/Variables/fonts',
//  '../src/Styles/Variables/animations',
//  '../src/Styles/Variables/zIndexes'
].map(require.resolve);

mix.js('resources/js/app.js', 'public/assets/bundle').react()
    .sourceMaps(true, 'source-map')
    .sass('resources/sass/app.scss', 'public/css', {
        sassOptions: {
            includePaths: [
                './resources/sass',
            ]
        }
    });

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': __dirname + '/resources/js',
    },
  },
}).sourceMaps();
