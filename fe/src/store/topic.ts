import { Action, Reducer } from 'redux';
import { CardData } from '@models/card';
import { TopicName } from 'src/models/topic';
import { DefaultAction, ActionEnum } from './index';

//action
export enum TopicEnum {
  FETCH_TOPIC = "FETCH_TOPIC"
}
type TopicType = ActionEnum | TopicEnum;  

export interface TopicBasicState{
  topic: TopicName
  isLoading :boolean
  data: CardData[];
  error: boolean 
}
export const initialState = {} as TopicBasicState;

//action type
export interface DispatchAction extends Action<TopicType> {
  payload? : TopicBasicState;
  url?: string
}
//action creator
type ActionCreator = (
  type?: TopicType,
  payload?: TopicBasicState,
  url?: string
) => DispatchAction;

const fetch: ActionCreator = (
  url
) => ({
  type: TopicEnum.FETCH_TOPIC,
  url, 
});
const load: ActionCreator = () => ({
  type: ActionEnum.FETCH_LOADING,
}); 
const success: ActionCreator = (_, payload) => ({
  type: ActionEnum.FETCH_SUCCESS,
  payload
})
const error: ActionCreator = () => ({
  type: ActionEnum.FETCH_ERROR
})

export const topicCreator = {
  fetch,
  load,
  success,
  error  
}

export const topicReducer = (
  state = initialState, action: DispatchAction
) => {
  switch(action.type){
    case TopicEnum.FETCH_TOPIC: 
      return {
        ...state,
        error: false
      }
    case ActionEnum.FETCH_SUCCESS: 
      return {
        topic: action.payload?.topic,
        data: action.payload?.data,
        error: false 
      }
    case ActionEnum.FETCH_LOADING: 
      return {
        ...state,
        isLoading: true,
      }
    case ActionEnum.FETCH_ERROR:
      return {
        state: [],
        isLoading: false,
        error: true  
      }
    default:
      throw new Error(`unknown topic name ${action.type}`); 
  } 
}

export type TopicState = ReturnType<typeof topicReducer>; 