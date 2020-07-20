import { fork, all } from 'redux-saga/effects';
import { topicSaga } from './topic';
import { loginSaga } from './user'; 


function* rootSaga(){
  yield fork(topicSaga);
  yield fork(loginSaga)
}

type APIEndpoint<P extends any[], R> = (...p:P) => Promise<R>;


export {
  rootSaga,
}