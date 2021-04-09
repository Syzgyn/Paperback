const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginHtmlTags = require('html-webpack-plugin/lib/html-tags');
const reload = require('require-nocache')(module);

const frontendFolder = path.join(__dirname, 'frontend');
const srcFolder = path.join(frontendFolder, 'js');
const isProduction = process.argv.indexOf('--production') > -1;
const isProfiling = isProduction && process.argv.indexOf('--profile') > -1;
const inlineWebWorkers = 'no-fallback';

const distFolder = path.resolve(frontendFolder, '..', 'public', 'assets', 'bundle');

const cssVarsFiles = [
  path.join(srcFolder, 'Styles/Variables/colors'),
  path.join(srcFolder, 'Styles/Variables/dimensions'),
  path.join(srcFolder, 'Styles/Variables/fonts'),
  path.join(srcFolder, 'Styles/Variables/animations'),
  path.join(srcFolder, 'Styles/Variables/zIndexes'),
].map(require.resolve);

const cssVarIncludes = cssVarsFiles.reduce((acc, vars) => {
    return Object.assign(acc, reload(vars));
}, {})

HtmlWebpackPlugin.prototype.injectAssetsIntoHtml = function(html, assets, assetTags) {
  const head = assetTags.headTags.map((v) => {
    const href = v.attributes.href
      .replace('\\', '/')
      .replace('%5C', '/');

    v.attributes = { rel: 'stylesheet', type: 'text/css', href: `/${href}` };
    return HtmlWebpackPluginHtmlTags.htmlTagObjectToString(v, this.options.xhtml);
  });
  const body = assetTags.bodyTags.map((v) => {
    v.attributes = { src: `/${v.attributes.src}` };
    return HtmlWebpackPluginHtmlTags.htmlTagObjectToString(v, this.options.xhtml);
  });

  return html
    .replace('<!-- webpack bundles head -->', head.join('\r\n  '))
    .replace('<!-- webpack bundles body -->', body.join('\r\n  '));
};

const plugins = [
  new webpack.DefinePlugin({
    __DEV__: !isProduction,
    'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
  }),

  new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css',
  }),

/*
  new HtmlWebpackPlugin({
    template: 'resources/js/index.html',
    filename: 'index.html'
  })
  */
];

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: 'cheap-source-map',

  stats: {
    children: false
  },

  watchOptions: {
    ignored: /node_modules/
  },

  entry: {
    index: path.join(srcFolder, 'index.js'),
  },

  resolve: {
    modules: [
      srcFolder,
      path.join(srcFolder, 'Shims'),
      'node_modules'
    ],
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },

  output: {
    path: distFolder,
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map'
  },

  performance: {
    hints: false
  },

  plugins,

  resolveLoader: {
    modules: [
      'node_modules',
      'frontend/gulp/webpack/'
    ]
  },

  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: '[name].js',
            inline: inlineWebWorkers
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|JsLibraries)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: `${frontendFolder}/babel.config.js`,
              envName: isProduction ? 'production' : 'development',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    loose: true,
                    debug: false,
                    useBuiltIns: 'entry',
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      },

      // CSS Modules
      {
        test: /\.css$/,
        exclude: /(node_modules|globals.css)/,
        use: [
          //{ loader: MiniCssExtractPlugin.loader },
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]/[local]/[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-mixins',
                    {
                      mixinsDir: [
                        'frontend/js/Styles/Mixins'
                      ]
                    }
                  ],
                  [
                    'postcss-simple-vars',
                    {
                      variables: cssVarIncludes,
                    }
                  ],
                  'postcss-nested',
                  'postcss-import',
                ],
              },
            },
          },
        ]
      },

      // Global styles
      {
        test: /\.css$/,
        include: /(node_modules|globals.css)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },

      // Fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              mimetype: 'application/font-woff',
              emitFile: false,
              name: 'Content/Fonts/[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.(ttf|eot|eot?#iefix|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: 'Content/Fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
