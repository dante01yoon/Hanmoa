import React , { FC, ReactElement } from 'react';
import { HanmoaTheme } from './theme/Provider';
import {StaticRouter} from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalLayout from '@components/gnb/layout';
import {renderRoutes}  from '@components/route/route';
import { Provider } from "mobx-react";
import { ModalProvider } from 'src/store/modal';
import { ReduxProvider } from '@store/index'; 
import { ReducedStore } from "@store/u";

export interface IRootRouter {
  router?: ReactElement;
}

export interface AppProps extends IRootRouter {
  store?: ReducedStore
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
}) => {
  console.log("store: ", store);
  return (
    <HanmoaTheme> 
      <Helmet>
        <title>Hanmoa - grouping your team!</title>
      </Helmet>
        <Provider {...store}>
          <ReduxProvider>
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
          </ReduxProvider>
        </Provider>
    </HanmoaTheme>
  )
}
export default App;