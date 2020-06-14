import { 
  Action,
  Reducer,
  ActionCreator
 } from "redux";
import { stringify } from "querystring";
 export enum LOGIN_ENUM {
  LOGIN_FETCH = "LOGIN_FETCH",
  LOGIN_LOADING = "LOGIN_LOADING",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR", 
  LOGIN_SIGNOUT = "LOGIN_SIGNOUT", 
  LOGIN_SIGNOUT_SUCCESS = "LOGIN_SIGNOUT_SUCCESS"
}
//initialState
type LoginStateType = {
  isLoading: boolean,
  token: string, 
  isSignIn: boolean,
  isValidate: boolean
  isError: boolean
}
const initialState: LoginStateType = {
  isLoading: false,
  token: '',
  isSignIn: false, 
  isValidate: false, 
  isError: false  
}

//action
interface LoginFetchAction extends Action {
  type: typeof LOGIN_ENUM.LOGIN_FETCH
  payload: {
    id: string,
    password: string
  } 
}
interface LoginFetchLoading extends Action {
  type: typeof LOGIN_ENUM.LOGIN_LOADING
}
interface LoginFetchSuccess extends Action {
  type: typeof LOGIN_ENUM.LOGIN_SUCCESS
  payload: {
    token: string 
  }
}
interface LoginFetchError extends Action {
  type: typeof LOGIN_ENUM.LOGIN_ERROR
}
interface LoginSignOut extends Action {
  type: typeof LOGIN_ENUM.LOGIN_SIGNOUT
}
interface LoginSingOutSuccess extends Action {
  type: typeof LOGIN_ENUM.LOGIN_SIGNOUT_SUCCESS
}
//actioncreator
const LoginFetch: ActionCreator<LoginFetchAction> = ({
  id, password  
}) => ({
  type: LOGIN_ENUM.LOGIN_FETCH,
  payload: { id, password }
})
const LoginLoading: ActionCreator<LoginFetchLoading> = (

) => ({
  type: LOGIN_ENUM.LOGIN_LOADING
})
const LoginSuccess: ActionCreator<LoginFetchSuccess> = (
 token: string ) => ({
  type: LOGIN_ENUM.LOGIN_SUCCESS,
  payload: { token }
})
const LoginError: ActionCreator<LoginFetchError> = (

) =>({
  type: LOGIN_ENUM.LOGIN_ERROR  
})
const LoginSignout: ActionCreator<LoginSignOut> = (
  type: LOGIN_ENUM.LOGIN_ERROR 
) => ({
  type: LOGIN_ENUM.LOGIN_SIGNOUT
})
const LoginSignoutSuccess: ActionCreator<LoginSingOutSuccess> =(
  type: LOGIN_ENUM.LOGIN_SIGNOUT_SUCCESS
) => ({
  type: LOGIN_ENUM.LOGIN_SIGNOUT_SUCCESS
})
type LoginAction  =
  | ReturnType<typeof LoginError>
  | ReturnType<typeof LoginSuccess>
  | ReturnType<typeof LoginFetch>
  | ReturnType<typeof LoginLoading>
  | ReturnType<typeof LoginSignout>
  | ReturnType<typeof LoginSignoutSuccess>
//reducer
const loginReducer: Reducer<LoginStateType , LoginAction>  = (
  state = initialState, action
) => {
  switch(action.type){
    case LOGIN_ENUM.LOGIN_FETCH:
      return {
        ...state,
        token: '',
        isValidate: false,
        isError : false
      }
    case LOGIN_ENUM.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_ENUM.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token, 
        isLoading: false
      }
    case LOGIN_ENUM.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true 
      }
    case LOGIN_ENUM.LOGIN_SIGNOUT:
      return {
        ...state,
        
      }
    default: state
  }
  
}
//