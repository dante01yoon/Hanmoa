import { Action, ActionCreator, ActionCreatorsMapObject } from "redux";

export enum GET_LOGIN {
    GET_LOGIN_BEGIN = "GET_LOGIN_ENUM",
    GET_LOGIN_SUCCESS = "LOGIN_SUCCESS",
    GET_LOGIN_FAILURE = "LOGIN_FAILURE",
}

//action
interface ILoginBeginAction extends Action<GET_LOGIN> {
    type: GET_LOGIN.GET_LOGIN_BEGIN
}

interface ILoginSuccessAction extends Action<GET_LOGIN> {
    type: GET_LOGIN.GET_LOGIN_SUCCESS
    payload: {
        token : string,
        studentId: string,
        name: string
    }
}

interface ILoginFailureAction extends Action<GET_LOGIN>{
    type: GET_LOGIN.GET_LOGIN_FAILURE
}

//action creator
const createGetLoginBegin: ActionCreator<ILoginBeginAction> = () => ({
    type: GET_LOGIN.GET_LOGIN_BEGIN
})

const createGetLoginSuccess: ActionCreator<ILoginSuccessAction> = (payload: {
    studentId: string,
    name: string,
    token: string
}) => ({
    type: GET_LOGIN.GET_LOGIN_SUCCESS,
    payload : {
        studentId: payload.studentId,
        name: payload.name,
        token: payload.token
    }
})

const createGetLoginFailure: ActionCreator<ILoginFailureAction> = () =>({
    type: GET_LOGIN.GET_LOGIN_FAILURE
})

// actionCreator map
const getLoginActions:ActionCreatorsMapObject<Action<GET_LOGIN>> = ({
    begin: createGetLoginBegin,
    success: createGetLoginSuccess,
    failure: createGetLoginFailure
})

export default getLoginActions;



