import { fork, all } from 'redux-saga/effects';
import { topicSaga } from './topic';

function* rootSaga(){
  yield all([
    fork(topicSaga)
  ])
}


export {
  rootSaga
}