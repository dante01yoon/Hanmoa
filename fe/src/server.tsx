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

const app = express();

if( process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js').map((config: any) => {
    config.output.path = config.output.path.replace('dist/dist/', 'dist/');
    return config;
  });
  
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
app.use(express.static(path.resolve(__dirname)));

app.get('*',(req,res) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const sheet = new ServerStyleSheet();
  const nodeExtractor = new ChunkExtractor({statsFile: nodeStats});
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({statsFile: webStats});

  // const store = createStore();
  const context = {};

  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );

  const html = renderToString(sheet.collectStyles(jsx));
  const helmet = Helmet.renderStatic();
  const styles = sheet.getStyleTags();
  const collected = {
    helmet: helmet.title.toString(),
    script: webExtractor.getScriptTags(),
    style: webExtractor.getStyleTags() + styles,
    link: webExtractor.getLinkTags()
  }
  res.set('content-type', 'text/html');
  res.send(renderFullPage( collected ,html));
})
app.listen(5000, () => console.log('Server started http://localhost:5000'));
