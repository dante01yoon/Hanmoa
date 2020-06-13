import { Action, ActionCreator, Reducer } from 'redux';
import { CardData } from '@models/card';
import { TopicName } from 'src/models/topic';
import { ActionEnum } from './index';

//action
export enum TopicEnum {
  FETCH_TOPIC = "FETCH_TOPIC"
}
type TopicType = ActionEnum | TopicEnum;  

export interface TopicBasicState{
  topic: TopicName
  isLoading :boolean
  data: CardData[]
  isError: boolean 
}
export const initialState: TopicBasicState = {
  topic: 'all',
  isLoading: true,
  data: [] as CardData[], 
  isError: false
}

//action type
export interface FetchAction extends Action {
  type: typeof TopicEnum.FETCH_TOPIC
  url: string;
}
interface LoadingAction extends Action{
  type: typeof ActionEnum.FETCH_LOADING
}
interface SuccessAction extends Action{
  type: typeof ActionEnum.FETCH_SUCCESS
  payload: TopicBasicState
}
interface ErrorAction extends Action{
  type: typeof ActionEnum.FETCH_ERROR
}
//action creator
const fetch: ActionCreator<FetchAction> = (
  url = 'all'
) => ({ 
  type: TopicEnum.FETCH_TOPIC,
  url, 
});
const load: ActionCreator<LoadingAction> = () => ({
  type: ActionEnum.FETCH_LOADING,
}); 
const success: ActionCreator<SuccessAction> = (payload) => ({
  type: ActionEnum.FETCH_SUCCESS,
  payload
})
const error: ActionCreator<ErrorAction> = () => ({
  type: ActionEnum.FETCH_ERROR
})

type TopicAction =
  | ReturnType<typeof fetch>
  | ReturnType<typeof load>
  | ReturnType<typeof success>
  | ReturnType<typeof error>

export const topicCreator = {
  fetch,
  load,
  success,
  error  
}
const topicReducer: Reducer<TopicBasicState, TopicAction>= (
  state = initialState, action
) => {
  switch(action.type){
    case TopicEnum.FETCH_TOPIC: 
      return {
        ...state,
        isError: false
      }
    case ActionEnum.FETCH_SUCCESS: 
      return {
        ...state, 
        topic: action.payload?.topic,
        isLoading: false, 
        data: action.payload?.data
      }
    case ActionEnum.FETCH_LOADING: 
      return {
        ...state,
        isLoading: true,
      }
    case ActionEnum.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true  
      }
    default:
      return state;
  } 
}

export type TopicState = ReturnType<typeof topicReducer>; 
export default topicReducer;