import React , { FC } from 'react';
import { HanmoaTheme } from './theme/Provider';
import { Helmet } from 'react-helmet';

import { GlobalLayout } from '@components/gnb/layout';
import { HanmoaRouter } from './components/route';
export const App:FC = () => {
  return (
    <HanmoaTheme>
      <Helmet>
        <title>Hanmoa - grouping your team!</title>
      </Helmet>
      <GlobalLayout>
        <HanmoaRouter/>
      </GlobalLayout>
    </HanmoaTheme>
  )
}
export default App;