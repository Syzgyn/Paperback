const reload = require('require-nocache')(module);
const path = require('path');

module.exports = (ctx, configPath, options) => {
  const rootDir = ctx.webpackLoaderContext.rootContext;
  const srcFolder = path.join(rootDir, 'frontend', 'js');

  const cssVarsFiles = [
    path.join(srcFolder, 'Styles/Variables/colors'),
    path.join(srcFolder, 'Styles/Variables/dimensions'),
    path.join(srcFolder, 'Styles/Variables/fonts'),
    path.join(srcFolder, 'Styles/Variables/animations'),
    path.join(srcFolder, 'Styles/Variables/zIndexes'),
  ].map(require.resolve);

  const includes = cssVarsFiles.reduce((acc, vars) => {
    return Object.assign(acc, reload(vars));
  }, {})

  const postcssOptions = {
    plugins: {
      'postcss-mixins': {
        mixinsDir: [
          'frontend/js/Styles/Mixins'
        ]
      },
      'postcss-color-function': {},
      'postcss-simple-vars': {
        variables: includes,
      },
      'postcss-nested': {},
      'postcss-import': {},
    }
  };

  return {postcssOptions};
};
