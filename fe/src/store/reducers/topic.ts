import { Reducer } from "redux";
import {TGetTopicAction,GET_TOPIC_ENUM } from "@store/actions/topic";
import {TTopicData} from "@models/topic";
import {CardData} from "@models/topic";



export interface ITopicStateInterface extends TTopicData{
    isLoading: boolean;
    isError: boolean;
}

const initialState: ITopicStateInterface ={
    topic: "all",
    data: [] as CardData,
    isLoading: false,
    isError: false,
}

const getTopicReducer: Reducer<ITopicStateInterface,TGetTopicAction> = (
    state = initialState,
        action
) => {
    switch(action.type){
        case GET_TOPIC_ENUM.REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case GET_TOPIC_ENUM.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case GET_TOPIC_ENUM.FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}
export type TGetTopicStateType = ReturnType<typeof getTopicReducer>;
export default getTopicReducer;