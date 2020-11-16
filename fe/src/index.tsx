import { hydrate } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { App } from './App';
import { createStore } from "@store/u"
import storeSpec from "@store/storeSpec";

const store = createStore(storeSpec);
console.log("store: ", store);

loadableReady( () => { // CSR일때
  
  const rootElement = document.getElementById('root');

  hydrate(
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>,
    rootElement
  )
});

if(module.hot){
  module.hot.accept(); 
}