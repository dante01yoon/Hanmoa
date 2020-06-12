import React, { FC } from 'react';
import { Provider } from 'react-redux'; 
import { 
  Dispatch,
  combineReducers,
  createStore,
} from 'redux';
import { topicReducer as topic } from './topic';
interface DispatchAction<T> extends Dispatch{
  payload: Partial<T>;
}

export interface RootReducer{
  topic: typeof topic 
  }
export const reducerIntegration: RootReducer = {
  topic 
}
export const rootReducer = combineReducers(reducerIntegration);
// root store type 
export type RootState = ReturnType<typeof rootReducer>

export const rootStore = createStore(rootReducer); 

export const ReduxProvider:FC = ({
  children
}) => {
  return(
    <Provider store={rootStore}>
      {children}
    </Provider>
  )
};

