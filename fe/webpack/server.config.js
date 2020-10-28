const path = require("path");

module.exports = function getOverridenServerWebpackConfig(env = null){
  return overridingServerWebpackConfig( ({nodeEnv}) => {
    let config = {
      context : path.resolve(__dirname, "../src"),
      entry: "web",
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