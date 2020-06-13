import { Action, Reducer } from 'redux';

export interface InitialState{
  id: number, 
  topic: string    
}
export const initialState = {} as InitialState;
export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}


export const topicReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState, action
) => {
  switch(action.type){
    case 'all':
      return {
        id: 0,
        topic: 'all'
      }
    case 'etc':
      return {
        id: 1,
        topic: 'etc'
      }
    case 'netflix':
      return {
        id: 2,
        topic: 'netflix'
      }
    case 'adobe':
      return {
        id: 3,
        topic: 'adobe'
      }
    case 'watcha':
      return {
        id: 4,
        topic: 'watcha'
      }
    case 'roommate':
      return {
        id: 5,
        topic: 'roommate'
      }
    case 'newspaper':
      return {
        id: 6,
        topic: 'newspaper'
      }
    case 'share':
      return {
        id: 7,
        topic: 'share'
      }
    case 'ktx':
      return {
        id: 8,
        topic: 'ktx'
      }
    default:
      return state
  } 
}

export type TopicState = ReturnType<typeof topicReducer>; 