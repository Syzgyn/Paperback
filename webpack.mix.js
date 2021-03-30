const mix = require('laravel-mix');
const util = require('util');
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
      'sass': __dirname + '/resources/sass',
    }
  },
}).sourceMaps();

mix.extend('foo', function(webpackConfig, ...args) {
    webpackConfig.module.rules.forEach(rule => {
        if (! rule.hasOwnProperty('oneOf')) { return;}
        rule.oneOf.forEach(oneOf => {
            oneOf.use.forEach(use => {
                if (use.loader === "css-loader" && typeof use.options.modules !== 'boolean') {
                    use.options.modules.localIdentName = '[name]/[local]/[hash:base64:5]';
                }
            });
        });
    });
});

mix.foo('testvalue');
