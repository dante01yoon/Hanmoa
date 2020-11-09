import type { RequestHandler, Request } from "express";
import { StoreSpecType } from "src/store/storeSpec";

class LazyMiddleWare{
  run: () => {};

  constructor(run: () => {}){
    this.run = run; 
  }
}

export interface RenderAppOptions{
  routes: any;
  storeSpec: StoreSpecType;
  theme: any;
  assets: {
    lib: {
      css: any;
    },
    js: any;
  };
  createExtraModules: (req: Request) => ({api: any}),
}

export interface CreateAppMiddleWareOptions { 
  renderApp: RenderAppOptions;
  [key: string]: any;
}

interface Middleware { 
  name: string; 
  value: LazyMiddleWare
};

type CreateAppMiddleWareType<O,E> = (options: O, processMiddlewares?: E) => any;

type ProcessMiddleWares = (middlewares: Array<Middleware>) => Array<Middleware>;

const createAppMiddleWare: CreateAppMiddleWareType<CreateAppMiddleWareOptions, ProcessMiddleWares> = (
  options,
  processMiddlewares,
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
      name: "bodyParser",
      value: new LazyMiddleWare(() => compose([
        bodyParser.json(),
        bodyParser.urlEncoded({extended: false}),
      ])),
    },
    {
      name: "cookieParser",
      value: new LazyMiddleWare(() => cookieParser()),
    },
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