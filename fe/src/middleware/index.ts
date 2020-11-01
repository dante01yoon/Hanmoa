import type { RequestHandler } from "express";

class LazyMiddleWare{
  run: () => {};

  constructor(run: () => {}){
    this.run = run; 
  }
}

interface Options { 
  renderApp: () => {};
  [key: string]: any;
}

interface Middleware { 
  name: string; 
  value: LazyMiddleWare
};

type ProcessMiddleWares = (middlewares: Array<Middleware>) => Array<Middleware>;

const createAppMiddleWare = (
  options: Options,
  processMiddlewares?: ProcessMiddleWares,
) => {
  const path = require("path");

  const bodyParser = require("body-parser");
  const { compose } = require("compose-middleware");
  const cookieParser = require("cookie-parser");
  const helmet = require("helmet");
  const logger = require("morgan");
  const favicon = require("serve-favicon");

  const middlewares = require("./u");
  
  let addedMiddlewares: Array<Middleware> = [
    {
      name: "renderApp",
      value: new LazyMiddleWare(() => middlewares.renderApp(options.renderApp)),
    },
  ]
  if(processMiddlewares) {
    addedMiddlewares = processMiddlewares(addedMiddlewares); 
  }
  return compose(
    addedMiddlewares.map((middleware) => {
      middleware.value.run();
    })
  )
}

export default createAppMiddleWare;