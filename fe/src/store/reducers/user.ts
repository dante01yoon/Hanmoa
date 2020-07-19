import {Reducer} from "redux";
import {GET_LOGIN_ENUM, TLoginAction} from "@store/actions/user";

interface ILoginStateInterface {
    isLoading: boolean,
    token: string,
    isSignIn: boolean,
    isValidate: boolean
    isError: boolean
    user: {
        username: string,
        studentId: string
    }
}

const initialState: ILoginStateInterface = {
    isLoading: false,
    token: '',
    user: {
        username: '',
        studentId: '',
    },
    isSignIn: false,
    isValidate: false,
    isError: false
}

const loginReducer: Reducer<ILoginStateInterface, TLoginAction> = (
    state =  initialState,
    action
) => {
    switch(action.type){
        case GET_LOGIN_ENUM.GET_LOGIN_BEGIN:
            return {
                ...state,
                isLoading: true,
            }
        case GET_LOGIN_ENUM.GET_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    username: action.payload.name,
                    studentId: action.payload.studentId
                },
                token: action.payload.token
            }
        case GET_LOGIN_ENUM.GET_LOGIN_FAILURE:
            return {
                ...state,
                isError: true,
            }
    }
}

export type TLoginStateType = ReturnType<typeof loginReducer>;
export default loginReducer;