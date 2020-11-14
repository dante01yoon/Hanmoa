const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  node: false, // it enables '__dirname' in files. If is not, '__dirname' always return '/'.
  entry: {
    server: './src/server.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: `/node/`,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader', 'ts-loader',
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 10000,
            }
          }
        ]
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  externals: [nodeExternals()],
};