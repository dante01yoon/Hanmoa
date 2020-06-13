import { Action, Reducer } from 'redux';
import { CardData } from '@models/card';
import { TopicName } from 'src/models/topic';
import { DefaultAction } from './index';


//action
type FETCH_TOPIC = "FETCH_TOPIC"

interface TopicAction extends DefaultAction{
  FETCH_TOPIC: FETCH_TOPIC 
} 


export interface InitialState{
  topic: TopicName
  data: CardData[]; 
}
export const initialState = {} as InitialState;

//action type
export interface DispatchAction extends Action {
  payload? : InitialState;
  url?: string 
}
//action creator
type ActionCreator = (
  type?: TopicAction,
  data?: InitialState,
  url?: string
) => DispatchAction | DispatchAction;

export const fetch: ActionCreator = (
  url: string
) => ({
  type: 'FETCH_TOPIC',
  url, 
});
export const load: DispatchAction = {
  type: 'FETCH_LOADING',
}
export const success: ( payload: InitialState ) => DispatchAction => {
  type: 'FETCH_SUCCESS'
}

export const topicReducer = (
  state = initialState, action: DispatchAction
) => {
  switch(action.type){
    case 'all':
    case 'etc':
    case 'netflix': 
    case 'adobe':
    case 'watcha':
    case 'roommate':
    case 'newspaper':
    case 'share':
    case 'ktx':
      return {
        topic: action.payload?.topic,
        data: action.payload?.data 
      }
    default:
      throw new Error(`unknown topic name ${action.type}`); 
  } 
}

export type TopicState = ReturnType<typeof topicReducer>; 