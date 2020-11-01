const path = require("path");
const pick = require("lodash/pick");
const {getOverridingClientWebpackConfig} = require("./index");

/**
 * @param {{entry: string}} env 
 */
module.exports = function returnOverrideClientWebpackConfig(env = null){
  return getOverridingClientWebpackConfig( () => {
      const entry = {
        web: "./web/public/javascript",
      };

      let config = {
        context: path.resolve(__dirname, "../src"),
        entry: env && env.entry ? pick(entry,env) : entry,
        output: {
          path: path.resolve(__dirname, "../build/public"),
        },
        module: {
          rules: [
            {
              test: /\.inline\.svg$/,
              lodaer: "raw-loader",
            },
          ], // end of rule
        }, // end of module
      } // end of config

      return config;
    }
  )
};