const path = require("path");
const { env } = require("process");

module.exports = function getOverridenServerWebpackConfig(env = null){
  return overridingServerWebpackConfig( ({nodeEnv}) => {
    let config = {
      context : path.resolve(__dirname, "../src"),
      entry: "some entry",
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