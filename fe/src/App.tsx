import React , { FC, ReactElement } from 'react';
import { HanmoaTheme } from './theme/Provider';
import {StaticRouter} from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalLayout from '@components/gnb/layout';
import {renderRoutes}  from '@components/route/route';
import { Provider as MobxProvider} from "mobx-react";
import { ModalProvider } from 'src/store/modal';
import { ReduxProvider } from '@store/index'; 
import { ReducedStore } from "@store/u";
import { observer } from "mobx-react";
export interface IRootRouter {
  router?: ReactElement;
}

export interface AppProps extends IRootRouter {
  store?: ReducedStore
  extraModules?: Record<string,any>;
}
const renderGrandRouter =  (router: ReactElement,children: ReactElement) => {
  return React.cloneElement(
    router ? router : typeof window === "undefined" ? <StaticRouter /> : <BrowserRouter />,
    undefined,
    children
  )
}

export const App:FC<AppProps> = ({
  router,
  store,
  extraModules = null,
}) => {
  return (
    <HanmoaTheme> 
      <Helmet>
        <title>Hanmoa - grouping your team!</title>
      </Helmet>
        <ReduxProvider>
          <MobxProvider {...extraModules} {...store}>
            <ModalProvider>
              <GlobalLayout>
                {renderRoutes()}
              </GlobalLayout>
              {
              /* FIXME ssr 향상시킬때 사용하기 */
              /* {renderGrandRouter(router,(
                <GlobalLayout>
                  {renderRoutes()}
                </GlobalLayout>
              ),)} */}
            </ModalProvider>
          </MobxProvider>
        </ReduxProvider>
    </HanmoaTheme>
  )
}
export default observer(App);