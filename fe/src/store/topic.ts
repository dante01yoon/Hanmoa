import { Action, Reducer } from 'redux';

export interface InitialState{
  id: number, 
  topic: string    
}
export const initialState = {} as InitialState;
export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

export const topicReducer: Reducer<InitialState, DispatchAction> = (state, action) => {
  return initialState;
}

