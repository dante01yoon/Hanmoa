require("dotenv").config();

const http = require("http");
const https = require("https");

const express = require("express");
const mobx = require("mobx");
const {NODE_ENV = "development"} = process.env;

class Server {
  constructor(root = true) {
    this.root = root; 
    this.nodeServer = null;
    this.proxiedServer = null;
  }

  run({
    port,
    entry = null, 
    webpackConfig = null, 
    ssl = null, 
  }){
    const app = express(); 

    app.set("port", port);
    app.disable("x-powered-by");
    
    if(webpackConfig){
      const webpack = require("webpack");
      const compiler = webpack(webpackConfig);
      
      let prevHash;
      compiler.watch({
        poll: false,
      }, (err, stats) => {
        if(err &&  err.message) {
          console.error(err.message);
        } else {
          const info = stats.toJson(); 
          if( info && info.hash !== prevHash){
            prevHash = info.hash;
            info.errors && console.error(info.errors);
            info.warnings && console.warn(...info.warnings);
          }
        }
      })
    }

    app.use((...args) => {
      require(entry).default(...args);
    });

    this.nodeServer = 
      NODE_ENV === "development"
        ? http.createServer(app)
        : https.createServer(app);
    
    this.nodeServer.listen(port);
    console.log(`server is listening on port ${port}`);
  }

  
};

mobx.configure({enforceActions: "observed"});

module.exports = new Server(); 