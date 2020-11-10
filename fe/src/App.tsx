import React , { FC, ReactElement } from 'react';
import { HanmoaTheme } from './theme/Provider';
import { Helmet } from 'react-helmet';
import { Provider } from "mobx-react";
import GlobalLayout from '@components/gnb/layout';
import renderRoutes from '@components/route/route';
import { ModalProvider } from 'src/store/modal';
import { ReduxProvider } from '@store/index'; 
import RootStore from './store/RootStore';

export interface IRootRouter {
  router: ReactElement;
}

const rootStore = new RootStore();

const renderGrandRouter =  (router: ReactElement,children: ReactElement) => {
  return React.cloneElement(
    router,
    undefined,
    children
  )
}

export const App:FC<IRootRouter> = ({
  router,
}) => {
  return (
    <HanmoaTheme>
      <Helmet>
        <title>Hanmoa - grouping your team!</title>
      </Helmet>
        <Provider {...rootStore}>
          <ReduxProvider>
            <ModalProvider>
              {renderGrandRouter(router,(
                <GlobalLayout>
                  {renderRoutes()}
                </GlobalLayout>
              ),)}
            </ModalProvider>
          </ReduxProvider>
        </Provider>
    </HanmoaTheme>
  )
}
export default App;