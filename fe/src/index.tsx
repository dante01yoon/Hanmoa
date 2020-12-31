import { hydrate } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { App } from './App';
import { createStore } from "@store/u"
import storeSpec from "@store/storeSpec";
import getRootData from "@utils/store/getRootData";

  const store = createStore({
    storeSpec,
    state: getRootData("initial-state"),
  });

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