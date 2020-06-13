import React, { FC } from 'react';
import { Provider } from 'react-redux'; 
import { 
  Dispatch,
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { topicReducer } from './topic';
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
    
//dispatch
interface DispatchAction<T> extends Dispatch{
  payload: Partial<T>;
}

// reducer
export interface RootReducer{
  topic: typeof topicReducer 
}
export const reducerIntegration: RootReducer = {
  topic: topicReducer 
}
export const rootReducer = combineReducers(reducerIntegration);
// root store type 
export type RootState = ReturnType<typeof rootReducer>

//saga
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const rootStore = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware) 
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

