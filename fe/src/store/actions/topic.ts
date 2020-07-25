import { Action, ActionCreator, ActionCreatorsMapObject } from "redux";
import { TTopicData } from "@models/topic";

interface ITopicBaseData extends TTopicData {}

export enum GET_TOPIC_ENUM {
  REQUEST = "GET_TOPIC_REQUEST",
  SUCCESS = "GET_TOPIC_SUCCESS",
  FAILURE = "GET_TOPIC_FAILURE",
}

interface ITopicBeginAction extends Action<GET_TOPIC_ENUM> {
  type: GET_TOPIC_ENUM.REQUEST;
}

interface ITopicSuccessAction extends Action<GET_TOPIC_ENUM> {
  type: GET_TOPIC_ENUM.SUCCESS;
  payload: ITopicBaseData;
}

interface ITopicFailureAction extends Action<GET_TOPIC_ENUM> {
  type: GET_TOPIC_ENUM.FAILURE;
}

export type TGetTopicAction =
  | ITopicBeginAction
  | ITopicSuccessAction
  | ITopicFailureAction;

const createGetTopicBegin: ActionCreator<ITopicBeginAction> = () => ({
  type: GET_TOPIC_ENUM.REQUEST,
});

const createGetTopicSuccess: ActionCreator<ITopicSuccessAction> = (
  payload: ITopicBaseData
) => ({
  type: GET_TOPIC_ENUM.SUCCESS,
  payload,
});

const createGetTopicFailure: ActionCreator<ITopicFailureAction> = () => ({
  type: GET_TOPIC_ENUM.FAILURE,
});

const getTopicActions: ActionCreatorsMapObject<TGetTopicAction> = {
  REQUEST: createGetTopicBegin,
  SUCCESS: createGetTopicSuccess,
  FAILURE: createGetTopicFailure,
};

export default getTopicActions;
