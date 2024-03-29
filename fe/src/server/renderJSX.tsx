import { ChunkExtractor } from '@loadable/server';
import { initStores as initMobxStores } from "src/middleware/renderApp";
import React from "react";
import { Request, Response } from "express";
import storeSpec from "src/store/storeSpec";
import { StaticRouter } from 'react-router-dom';
import { ReducedStore } from '@store/u';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { renderFullPage } from './renderFullPage';
import { ServerStyleSheet } from 'styled-components';
import { routes } from "@components/route/route";

export const initStore = async (req: Request) => {
  let mobxStores = {} as ReducedStore;
  try {
    mobxStores = await initMobxStores(storeSpec, req)
    if (req.cookies && req.cookies["_hm_guit"]) {
      await mobxStores.sessionStore.fetch(req);
    }
    await mobxStores.topicStore.fetchTopicList();
  } catch (error) {
    console.error("error in using initMobxStores: ", error);
    throw Error(error);
  }

  // server side data fetch in page component 
  const promiseArr = routes.filter((value) => {
    if (value.path) {
      return value.path.split("/")[1] === req.path.split("/")[1]
    }
  }).map((value) => {
    if (value.component && value.fetchInitialData) {
      return value.fetchInitialData(req, mobxStores);
    }
  })
  try {
    await Promise.all(promiseArr);
  } catch (error) {
    throw Error(error);
  }
  return mobxStores;
}

export const chunkManipulate = (nodeStats: string, webStats: string) => {
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const defaultApp = App as React.ComponentType<{ store: any }>;
  return { defaultApp, webExtractor };
}

export const buildJSX = (req: Request, { ...params }: {
  webExtractor: ChunkExtractor;
  context?: Record<string, any>;
  defaultApp: React.ComponentType<{ store: any }>;
  store: ReducedStore;
}) => {
  const { store, webExtractor, context = {}, defaultApp: App } = params;
  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <App store={store} />
    </StaticRouter>
  )
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(jsx));
  const helmet = Helmet.renderStatic();
  const styles = sheet.getStyleTags();
  const collectedWeb = {
    helmet: helmet.title.toString(),
    script: webExtractor.getScriptTags(),
    style: webExtractor.getStyleTags() + styles,
    link: webExtractor.getLinkTags()
  }

  return renderFullPage({
    collectedWeb,
    html,
    stores: store,
  });
}

const renderAppAsync = async (req: Request) => {
  const store = await initStore(req)
  return { store }
}

type RenderApp = (req: Request, res: Response, params: RenderAppParams) => void;

interface RenderAppParams {
  nodeStats: string;
  webStats: string;
}

export const renderApp: RenderApp = async (req, res, { ...params }) => {
  const { nodeStats, webStats } = params;
  const chunkObject = chunkManipulate(nodeStats, webStats);
  const asyncRenderItems = await renderAppAsync(req);
  const app = buildJSX(req, { ...asyncRenderItems, ...chunkObject });

  return app;
}