import createAppMiddleWare from "src/middleware";
import storeSpec from "src/store/storeSpec";
import { Request } from "express";
import { http } from "@apis/httpModule";

const web = createAppMiddleWare({
  renderApp: {
    routes: {},
    storeSpec,
    theme: {},
    assets: {
      lib: {
        css: {},
      },
      js: {},
    },
    createExtraModules: (req: Request) => ({
      api: http
    })
  },
});

export default web;