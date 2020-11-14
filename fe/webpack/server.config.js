const path = require("path");
const {getOverridingServerWebpackConfig} =  require("./index");

module.exports = function getOverridenServerWebpackConfig(env = null){
  return getOverridingServerWebpackConfig( ({nodeEnv}) => {
    const entry = {
      web: "./web",
    }
    let config = {
      context : path.resolve(__dirname, "../src"),
      entry: entry,
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