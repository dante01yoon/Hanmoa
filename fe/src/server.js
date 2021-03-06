const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { renderApp } = require("./server/renderJSX.tsx");
const app = express();

if( process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require("../webpack.client.js").map((config) => {
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
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname)));

app.get('*', async (req,res) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const hanmoaApp = await renderApp(req, res, {
    nodeStats,
    webStats,
  })
  res.set('content-type', 'text/html');
  res.send(hanmoaApp);
})
app.listen(5000, () => console.log('Server started http://localhost:5000'));
