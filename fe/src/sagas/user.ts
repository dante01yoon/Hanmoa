import * as effects from 'redux-saga/effects';
import { 
  LoginFetch, 
  LoginSignout,
  LoginLoading,
  LoginSuccess
 } from '@store/user';
 import { LOGIN_ENUM } from '@store/user';
import { googleAuthRequest } from '@apis/auth'; 
const { takeLatest, put , call, all ,fork, delay } = effects; 

function* fetchLogin(){
  yield console.log("fetchLogin dispatched");
  try{
    yield put(LoginLoading());
    const result  = yield call(googleAuthRequest); 
    yield console.log(result); 
    yield put(LoginSuccess());
  } catch(e){
    throw new Error(e); 
  }
}

function* fetchLoginWatcher() {
  yield takeLatest(LOGIN_ENUM.LOGIN_FETCH, fetchLogin); 
}
export function* LoginSaga(){
  yield fork(fetchLoginWatcher); 
}