
function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web');
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = api => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          targets: !web ? { node: 'current' } : undefined,
          modules: webpack ? false : 'commonjs',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@loadable/babel-plugin',
      [ 
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts','.tsx'],
          alias:{
            'src': './src',
            '@redux': './src/redux',
            '@components': './src/components',
            '@sagas': './src/sagas', 
            '@pages': './src/pages',
            '@store': './src/store',
            '@reducers': './src/store/reducers',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@modules': './src/modules',
            '@apis': './src/apis',
            '@models': './src/models'
          }
        }
      ], // end of module-resolver 
      //end of plugins 
    ],
  };
};