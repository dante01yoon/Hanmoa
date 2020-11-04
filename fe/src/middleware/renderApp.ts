import type {RequestHandler} from "express";
import ReactDOMServer from "react-dom/server";
import escapeForHtmlAttribute from "@utils/escapeForHtmlAttribute";
import App from "src/App";
import {StaticRouter} from "react-router";
import { pick } from "lodash";
import { createStore,  } from "@store/u"; 
import { StoreSpecType } from "@store/storeSpec";

const initStores = async (
  storeSpec: StoreSpecType,
  req: Request,
) => {
  const stores = createStore(storeSpec);
  
  try {
    if(req.cookies[])
  }
}

const renderHtml = ({
  assets = {},
  componentHtml,
  helmet = {},
  stores = {}
} : { 
    componentHtml: string, 
    stores: Object,
    helmet?: Object,
    assets?: Object,
  }) => {

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
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

const renderAppAsync = async (req, res, {storeSpec, ...resetOptions}) => {
  const stores = await initStores(
    storeSpec,
    req,
  )
}

const renderApp = (options: {[key:string]: any}): RequestHandler => {
  

  return (req, res, next )  => {
    renderAppAsync(req,res, options)
  } 
};


export default renderApp;