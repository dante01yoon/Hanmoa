import React , { FC } from 'react';
import { HanmoaTheme } from './theme/Provider';
import { Helmet } from 'react-helmet';
import { Provider } from "mobx-react";
import { GlobalLayout } from '@components/gnb/layout';
import HanmoaRouter from '@components/route/route';
import { ModalProvider } from 'src/store/modal';
import { ReduxProvider } from '@store/index'; 
import RootStore from './store/RootStore';

const rootStore = new RootStore();

export const App:FC = () => {
  return (
    <HanmoaTheme>
      <Helmet>
        <title>Hanmoa - grouping your team!</title>
      </Helmet>
        <Provider {...rootStore}>
          <ReduxProvider>
            <ModalProvider>
              <GlobalLayout>
                <HanmoaRouter/>
              </GlobalLayout>
            </ModalProvider>
          </ReduxProvider>
        </Provider>
    </HanmoaTheme>
  )
}
export default App;