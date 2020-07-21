import React, { FC } from 'react';
import { Provider } from 'react-redux'; 
import { 
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import topic from './topic';
import user from './user';
import { rootSaga } from '@sagas/index'; 

export enum ActionEnum {
  FETCH_LOADING = "FETCH_LOADING",
  FETCH_SUCCESS = "FETCH_SUCCESS", 
  FETCH_ERROR =  "FETCH_ERROR"
}
export type DefaultAction = 
  | ActionEnum.FETCH_SUCCESS
  | ActionEnum.FETCH_LOADING 
  | ActionEnum.FETCH_ERROR

export type TRootReducerKey = "topic" | "user"

// root reducer
export const rootReducer = combineReducers({
  topic,
  user 
});
// root store type 
export type RootState = ReturnType<typeof rootReducer>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer =  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//saga
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const rootStore = createStore(
    rootReducer,
    composeEnhancer(  
      applyMiddleware(sagaMiddleware)
    ) 
  ); 

  sagaMiddleware.run(rootSaga); 
  return rootStore
}

const rootStore = configureStore(); 

export const ReduxProvider:FC = ({
  children
}) => {
  return(
    <Provider store={rootStore}>
      {children}
    </Provider>
  )
};

