import { fork, all } from 'redux-saga/effects';
import { fetchTopic } from './topic';

function* rootSaga(){
  yield all([
    fork()
  ])
}


export {
  rootSaga
}