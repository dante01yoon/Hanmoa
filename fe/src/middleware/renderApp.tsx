import React from "React";
import type {NextFunction, Request, Response } from "express";
import {renderToString} from "react-dom/server";
import escapeForHtmlAttribute from "@utils/escapeForHtmlAttribute";
import App from "src/App";
import { createStore } from "@store/u"; 
import { StoreSpecType } from "@store/storeSpec";
import * as cookie from "@utils/cookie";
import { RenderAppOptions } from "./index";
import { StaticRouter } from "react-router-dom";

const initStores = async (
  storeSpec: StoreSpecType,
  req: Request
) => {
  const stores = createStore(storeSpec);

  try {
    if(req.cookies[cookie.COOKIE_NAME.SESSION]){
      await stores.sessionStore.update(req);
    }
  } catch(_){}
  
  return stores;
}

const renderHtml = ({
  assets = {},
  componentHtml,
  helmet,
  stores
}: {
  assets: any,
  componentHtml: string,
  helmet: { title: string; meta: any;},
  stores: ReturnType<typeof createStore>
}) => {
  console.log("stores: ", stores);
  return (`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        ${helmet.title};
        ${helmet.meta};
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        >
      </head>
      <body>
        <div
          id="root"
          data-initial-state="${escapeForHtmlAttribute(JSON.stringify(
            {...stores},
            (key, value) => {
              if(key && value && typeof value  === "object" && value.serializable){
                return value.serializable
              }
              return value;
            }
          ))}"
        >${componentHtml}</div>
      </body>
    </html>
  `)
}

interface RespondOptions extends Omit<RenderAppAsyncOptions, "storeSpec">{
  stores: ReturnType<typeof createStore>
}

const respond = (req:Request,res:Response, { 
  stores, 
  routes,
  assets,
}: RespondOptions ) => {
  const helmetContext: { helmet: { title: string; meta: any;} }  = {
    helmet: {
      title: "",
      meta: null,
    }
  };

  const componentHtml = renderToString(<App router={<StaticRouter location={req.url}/>} />);
  
  res.send(
    renderHtml({
      componentHtml,
      stores,
      assets,
      helmet: helmetContext.helmet,
    })
  );
}

export type ValueOf<T> = T[keyof T]; 

interface RenderAppAsyncOptions extends Omit<RenderAppOptions, "createExtraModules">{
  extraModules: ReturnType<ValueOf<Pick<RenderAppOptions, "createExtraModules">>>
} 

const renderAppAsync = async (req: Request, res: Response, { storeSpec, ...restOptions}: RenderAppAsyncOptions) => {
  const stores = await initStores(
    storeSpec,
    req,
  )
  
  respond(req,res, {stores, ...restOptions});
}

const renderApp = (options: RenderAppOptions) => {
  const { createExtraModules, ...restOptions } = options;

  return (req: Request, res: Response, next: NextFunction )  => {
    const extraModules = createExtraModules && createExtraModules(req);

    renderAppAsync(req,res, { ...restOptions, extraModules });
  } 
};


export default renderApp;