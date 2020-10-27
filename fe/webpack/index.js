const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const { webpackDefinedServer } = require("./helper/convertGlobalEnvToWebpackDefined"); 

exports.overrideClientWebpackConfig = function overrideClientWebpackConfig(overrider){
  const defaultPlugins = [
    ["@babel/proposal-decorators", { legacy: true }],
    "mobx-deep-action", // async await 에서 자동으로 nested 된 함수에 action을 달아주는 녀석 
    "@babel/plugin-syntax-dynamic-import", // 
    ["@babel/proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-optional-chaining",
  ]

  let config = {
    mode: "none",
    output: {
      filename: "javascripts/[name].[hash].js",
      chunkFilename: "javascripts/[name].[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(jpg|png|svg)$/,
          exclude: /\.inline\.svg$/,
          loader: "url-loader",
          options: {
            limit: 10240,
            name: "images/[name].[hash:20].[ext]",
          },
        },
        {
          test: /\.(otf|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash:20].[ext]",
          },
        },
        {
          test: /\/routes\/tests\/.+?\.html$/,
          loader: "raw-loader",
        },
        {
          test: /(\/src\/.+?|[/.]w)\.(js|ts|tsx)$/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: [
                      "last 2 versions",
                      "ie >= 11",
                      "Safari >= 9",
                      "Firefox ESR",
                    ], // TEMP
                  },
                  modules: false,
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: defaultPlugins,
            cacheDirectory: true,
          },
        },
      ],
    },
    resolve: {
      modules: ["local_modules", "node_modules"],
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
    plugins: [
      new webpack.DefinePlugin({
        ...webpackDefinedServer,
      }),
      new webpack.ExtendedAPIPlugin(),
      new MiniCssExtractPlugin({
        filename: "stylesheets/[name]/libs.[contenthash:20].css",
      }),
      // new ForkTsCheckerWebpackPlugin({
      //   tsconfig: "../tsconfig.json",
      //   async: envWithDefaults.NODE_ENV === "development",
      //   reportFiles: [
      //     "**/*.{ts,tsx}",
      //     "../packages/@watcha/wheat/**/*.{ts,tsx}",
      //     "!(../packages/@watcha/wheat/node_modules/**/*)",
      //   ],
      // }),
    ],
  };
}