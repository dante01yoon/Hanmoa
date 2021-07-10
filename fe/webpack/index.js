const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const webpackDefinedServer = require("./helper/convertGlobalEnvToWebpackDefined");

exports.getOverridingClientWebpackConfig = function overrideClientWebpackConfig(overrider) {
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
          test: /\.(otf|ttf|woff|woff2|ico)$/,
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
      modules: ["node_modules", path.resolve(__dirname, "../")],
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
    ],
  };

  switch (process.env.NODE_ENV) {
    case "production":
      config = merge(config, {
        mode: "production",
        devtool:
          envWithDefaults.NODE_ENV === "production"
            ? "hidden-source-map"
            : "nosources-source-map",
        optimization: {
          minimizer: [
            new TerserPlugin({
              parallel: true,
              sourceMap: true,
            }),
          ],
        },
      });
      break;
    default:
      throw new Error("Unknown environment");
  }

  return merge(
    config,
    overrider({ nodeEnv: process.env.NODE_ENV }),
  )
}

exports.getOverridingServerWebpackConfig = function overrideServerWebpackConfig(
  overrider,
) {
  const defaultPlugins = [
    ["@babel/proposal-decorators", { legacy: true }],
    "mobx-deep-action", // async await 에서 자동으로 nested 된 함수에 action을 달아주는 녀석 
    "@babel/plugin-syntax-dynamic-import", // 
    ["@babel/proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-optional-chaining",
  ];

  let config = {
    mode: "none",
    target: "node",
    output: {
      filename: "[name].js",
      publicPath: "http://localhost:8080/",
      library: "[name]",
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          exclude: /\.inline\.svg$/,
          loader: "url-loader",
          options: {
            limit: 10240,
            name: "images/[name].[hash:20].[ext]",
            emitFile: false,
          },
        },
        {
          test: /\.(otf|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash:20].[ext]",
            emitFile: false,
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
                    node: "current",
                  },
                  modules: false,
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ...defaultPlugins,
            ],
            cacheDirectory: true,
          },
        },
      ], // end of rules
    }, // end of modules
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "../")],
      extensions: [".js", ".json", ".ts", ".tsx"],
      alias: {
        "@components": path.resolve(__dirname, "../src/components/"),
        "@pages": path.resolve(__dirname, "../src/pages/"),
        "@store": path.resolve(__dirname, "../src/store/"),
        "@reducers": path.resolve(__dirname, "../src/store/reducers/"),
        "@theme": path.resolve(__dirname, "../src/theme/"),
        "@utils": path.resolve(__dirname, "../src/utils/"),
        "@modules": path.resolve(__dirname, "../src/modules/"),
        "@apis": path.resolve(__dirname, "../src/apis/"),
        "@models": path.resolve(__dirname, "../src/models/"),
        "@sagas": path.resolve(__dirname, "../src/sagas/"),
        "@payload": path.resolve(__dirname, "../src/payload/")
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        ...webpackDefinedServer,
      }),
      new webpack.ExtendedAPIPlugin(),
      new MiniCssExtractPlugin({
        filename: "stylesheets/[name]/libs.[contenthash:20].css",
      }),
    ],
  } // end of config 

  switch (process.env.NODE_ENV) {
    case "production":
      config = merge(config, {
        mode: "production",
        devtool: "source-map",
        optimization: {
          minimizer: [
            new TerserPlugin({
              parallel: true,
              sourceMap: true,
            }),
          ],
        },
      });
      break;
    default:
      break;
  }

  const mergedConfig = merge(
    config,
    overrider({ nodeEnv: process.env.NODE_ENV }),
  );
  console.log("mergedConfig.output: ", mergedConfig.output);
  return mergedConfig;
}