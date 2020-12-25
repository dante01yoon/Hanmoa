import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ChunkExtractor } from '@loadable/server';
import { renderFullPage } from './server/renderFullPage';
import { ServerStyleSheet } from 'styled-components';
import { initStores as initMobxStores } from "src/middleware/renderApp";
import storeSpec from "src/store/storeSpec";
import { routes } from "@components/route/route";
import { matchRoutes } from "react-router-config";
import cookieParser from "cookie-parser";
import { ReducedStore } from './store/u';

const app = express();

if( process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js').map((config: any) => {
    config.output.path = config.output.path.replace('dist/dist/', 'dist/');
    return config;
  });
  const webpackConfig2 = require("../webpack/server.config.js");
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: webpackConfig[0].output.publicPath,
      writeToDisk: true,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname)));

app.get('*', async (req,res) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const sheet = new ServerStyleSheet();
  const nodeExtractor = new ChunkExtractor({statsFile: nodeStats});
  const { default: App } = nodeExtractor.requireEntrypoint();
  const DefaultApp = App as React.ComponentType<{store: any}>;
  const webExtractor = new ChunkExtractor({statsFile: webStats});
  const context = {};

  // initialize store. 
  // const store = createStore();
  let mobxStores = {} as ReducedStore;

  try {
    mobxStores = await initMobxStores(storeSpec, req);
    console.log("mobxStores: ", mobxStores);
  } catch(error){
    console.log(error);
    throw Error(error);
  }
  // server side data fetch in page component 
  routes.filter((value) => {
    if( value.path){
      value.path.includes(req.path)
<<<<<<< HEAD
      // if(req.cookies && req.cookies["_hm_guit"]){
      //   mobxStores.sessionStore.fetch(req);
      //   console.log("sessionStore in server.tsx: ", mobxStores.sessionStore);
      // }
=======
      if(req.cookies && req.cookies["_hm_guit"]){
        mobxStores.sessionStore.fetchSignIn(req.cookies["_hm_guit"]);
      }
>>>>>>> 7b1a554... Update: POST signIn 작성 -오류 없음
    }
  }).map(async (value) => {
    if(value.component && value.component.initStoreOnServer){
      await value.component.initStoreOnServer()
    }
  })
  
  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <DefaultApp store={mobxStores}/>
    </StaticRouter>
  );

  const html = renderToString(sheet.collectStyles(jsx));
  const helmet = Helmet.renderStatic();
  const styles = sheet.getStyleTags();
  const collectedWeb = {
    helmet: helmet.title.toString(),
    script: webExtractor.getScriptTags(),
    style: webExtractor.getStyleTags() + styles,
    link: webExtractor.getLinkTags()
  }
  res.set('content-type', 'text/html');
  res.send(renderFullPage({
    collectedWeb,
    html,
    stores: mobxStores,
  }));
})
app.listen(5000, () => console.log('Server started http://localhost:5000'));
