import { hydrate } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { App } from './App';

loadableReady(() => { // CSR일때
  const rootElement = document.getElementById('root');
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  )
});

if(module.hot){
  module.hot.accept(); 
}