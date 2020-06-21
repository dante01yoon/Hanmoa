import { 
  Action,
  Reducer,
  ActionCreator
 } from "redux";
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
  user: {
    username: string, 
    stduentNumber: number
  }
}
const initialState: LoginStateType = {
  isLoading: false,
  token: '',
  user: {
    username: '', 
    stduentNumber: 0
  },
  isSignIn: false, 
  isValidate: false, 
  isError: false  
}

//action
interface LoginFetchAction extends Action {
  type: typeof LOGIN_ENUM.LOGIN_FETCH
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
export const LoginFetch: ActionCreator<LoginFetchAction> = (
  
) => ({
  type: LOGIN_ENUM.LOGIN_FETCH,
})
export const LoginLoading: ActionCreator<LoginFetchLoading> = (

) => ({
  type: LOGIN_ENUM.LOGIN_LOADING
})
export const LoginSuccess: ActionCreator<LoginFetchSuccess> = (
 token: string ) => ({
  type: LOGIN_ENUM.LOGIN_SUCCESS,
  payload: { token }
})
export const LoginError: ActionCreator<LoginFetchError> = (

) =>({
  type: LOGIN_ENUM.LOGIN_ERROR  
})
export const LoginSignout: ActionCreator<LoginSignOut> = (
  type: LOGIN_ENUM.LOGIN_ERROR 
) => ({
  type: LOGIN_ENUM.LOGIN_SIGNOUT
})
export const LoginSignoutSuccess: ActionCreator<LoginSingOutSuccess> =(
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
    default: 
      return state
  }
  
}
export type LoginState = ReturnType<typeof loginReducer>; 
export default loginReducer 
