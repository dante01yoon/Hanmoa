import type {RequestHandler} from "express";
import ReactDOMServer from "react-dom/server";
import escapeForHtmlAttribute from "@utils/escapeForHtmlAttribute";
import App from "src/App";
import {StaticRouter} from "react-router";
import { pick } from "lodash";

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

const renderApp = (options: Object): RequestHandler => {
  const renderComponentHtml = (req: Request,res: Response) => ReactDOMServer.renderToString(
    <App router={<StaticRouter location={req.url} />}
  );
  const stores = {};

  return (req, res, next )  => {
    res.send(
      renderHtml({
        componentHtml: renderComponentHtml(req,res), 
        stores,
      })
    );
  } 
};


export default renderApp;