import { hydrate } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';

import { App } from './App';

loadableReady(() => {
  const rootElement = document.getElementById('root');
  hydrate(
    // <Provider store={}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    // </Provider>,
    ,
    rootElement
  )
});

if(module.hot){
  module.hot.accept(); 
}