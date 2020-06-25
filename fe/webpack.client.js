const path = require('path');
const dotenv = require('dotenv'); 
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const devMode = process.env.NODE_ENV !== 'production';
const styledComponetnsTransformer = createStyledComponentsTransformer();
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev,next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {}); 

const getEntryPoint = target => {
  if(target === 'node'){
    return ['./src/App.tsx'];
  }
  return devMode? ['babel-polyfill',hotMiddlewareScript, './src/index.tsx'] : ['babel-polyfill', './src/index.tsx'];
};

const getConfig = target => ({
  mode: devMode? 'development': 'production',
  name: target,
  target,
  entry: getEntryPoint(target),

  output:  {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: '[name].js',
    publicPath: '/web/',
    libraryTarget: target=== 'node' ?  'commonjs2' : undefined,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          { 
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins:['react-hot-loader/babel']
            },
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({before: [styledComponetnsTransformer]}),
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use:[
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        use:['@svgr/webpack']
      }
    ],
  },

  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx'],
    alias: {
      pages:path.resolve('src/pages/'),
      components: path.resolve('src/components/'),
      util: path.resolve('src/util/'),
      style: path.resolve('src/style/'),
    },
  },
  plugins:
    target === 'web'
      ? [new LoadablePlugin(), new MiniCssExtractPlugin(), new webpack.DefinePlugin(envKeys), new webpack.HotModuleReplacementPlugin()]
      : [new LoadablePlugin(), new MiniCssExtractPlugin(), new webpack.DefinePlugin(envKeys)],

    externals: target === 'node' ? ['@loadable/component', nodeExternals()]: undefined, 
});


module.exports = [getConfig('web'), getConfig('node')];