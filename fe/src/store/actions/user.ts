import { Action, ActionCreator, ActionCreatorsMapObject } from "redux";

export enum GET_LOGIN_ENUM {
    REQUEST = "GET_LOGIN_REQUEST",
    SUCCESS = "GET_LOGIN_SUCCESS",
    FAILURE = "GET_LOGIN_FAILURE",
}

//action
interface ILoginBeginAction extends Action<GET_LOGIN_ENUM> {
    type: GET_LOGIN_ENUM.REQUEST
}

interface ILoginSuccessAction extends Action<GET_LOGIN_ENUM> {
    type: GET_LOGIN_ENUM.SUCCESS
    payload: {
        token : string,
        studentId: string,
        name: string
    }
}

interface ILoginFailureAction extends Action<GET_LOGIN_ENUM>{
    type: GET_LOGIN_ENUM.FAILURE
}

export type TLoginAction = ILoginBeginAction | ILoginSuccessAction | ILoginFailureAction;

//action creator
const createGetLoginBegin: ActionCreator<ILoginBeginAction> = () => ({
    type: GET_LOGIN_ENUM.REQUEST
})

const createGetLoginSuccess: ActionCreator<ILoginSuccessAction> = (payload: {
    studentId: string,
    name: string,
    token: string
}) => ({
    type: GET_LOGIN_ENUM.SUCCESS,
    payload : {
        studentId: payload.studentId,
        name: payload.name,
        token: payload.token
    }
})

const createGetLoginFailure: ActionCreator<ILoginFailureAction> = () =>({
    type: GET_LOGIN_ENUM.FAILURE
})

// actionCreator map
const getLoginActions:ActionCreatorsMapObject<TLoginAction> = ({
    REQUEST: createGetLoginBegin,
    SUCCESS: createGetLoginSuccess,
    FAILURE: createGetLoginFailure
})

export default getLoginActions;



