import { Reducer } from "redux";
import { TGetTopicAction, GET_TOPIC_ENUM } from "@store/actions/topic";
import { TTopicData } from "@models/topic";
import { ICardData } from "@models/card";

export interface ITopicStateInterface extends TTopicData {
  isLoading: boolean;
  isError: boolean;
}

const initialState: ITopicStateInterface = {
  isLoading: false,
  isError: false,
  topic: "all",
  data: [] as ICardData[],
};

const getTopicReducer: Reducer<ITopicStateInterface, TGetTopicAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_TOPIC_ENUM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TOPIC_ENUM.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_TOPIC_ENUM.FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export type TGetTopicStateType = ReturnType<typeof getTopicReducer>;
export default getTopicReducer;
