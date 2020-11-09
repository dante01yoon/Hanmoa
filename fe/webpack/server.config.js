const path = require("path");
const {getOverridingServerWebpackConfig} =  require("./index");

module.exports = function getOverridenServerWebpackConfig(env = null){
  return getOverridingServerWebpackConfig( ({nodeEnv}) => {
    let config = {
      context : path.resolve(__dirname, "../src"),
      entry: "./web",
      output: {
        path: path.resolve(__dirname, "../build"),
      },
      module: {
        rules: [
          {
            test: /\.inline\.svg$/,
            loader: "raw-loader",
          },
        ],
      },
    };

    return config; 
  })
};