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
      
      
    }

  this.nodeServer = 
    NODE_ENV === "development"
      ? http.createServer(app)
      : https.createServer(app);
  
  this.nodeServer.listen(port);
  }

  
};

mobx.configure({enforceActions: "observed"});

module.exports = new Server(); 