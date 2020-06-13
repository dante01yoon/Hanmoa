import React, { FC } from 'react';
import { Provider } from 'react-redux'; 
import { 
  Dispatch,
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { topicReducer as topic } from './topic';
import { rootSaga } from '@sagas/index'; 

//dispatch
interface DispatchAction<T> extends Dispatch{
  payload: Partial<T>;
}

// reducer
export interface RootReducer{
  topic: typeof topic 
  }
export const reducerIntegration: RootReducer = {
  topic 
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

