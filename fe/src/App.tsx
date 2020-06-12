import React , { FC } from 'react';
import { HanmoaTheme } from './theme/Provider';
import { Helmet } from 'react-helmet';

import { GlobalLayout } from '@components/gnb/layout';
import { HanmoaRouter } from './components/route';
import { ModalProvider } from 'src/store/modal';
import { ReduxProvider } from '@store/index';

export const App:FC = () => {
  return (
    <HanmoaTheme>
      <ReduxProvider>
        <Helmet>
          <title>Hanmoa - grouping your team!</title>
        </Helmet>
        <ModalProvider>
          <GlobalLayout>
            <HanmoaRouter/>
          </GlobalLayout>
        </ModalProvider>
      </ReduxProvider>
    </HanmoaTheme>
  )
}
export default App;