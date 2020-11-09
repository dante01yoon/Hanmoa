#!/bin/sh
":" //# See http://sambal.org/?p=1014.; exec /usr/bin/env node --max-old-space-size=4096 --inspect "$0" "$@"

require("dotenv").config();

const spawn = require("child_process").spawn;
const fs = require("fs");
const path = require("path");

const program = require("commander");
const server = require("../server")

const webpackConfig = require("../webpack/server.config");

const { PORT = 5000 } = process.env;

function runWebpackDevServer(){
  const args = [
    "webpack-dev-server",
    "--config",
    "./webpack/client.config.js"
  ];

  const child = spawn("npx", args, {
    cwd: path.resolve(__dirname, ".."),
  })

  child.on("close", code => process.exit(code));
};

program
  .version("0.0.1")
  .action(() => {
    server.run({
      port: parseInt(PORT,10),
      entry: "web",
      webpackConfig: webpackConfig(),
    });
    console.log("program launched");
    runWebpackDevServer();
  })
  .parse(process.argv);
