import { takeLatest, call, put } from 'redux-saga/effects';
import { TopicName, Topic, TopicList} from '@models/topic';

function* fetchTopic(url:string){
  try{
    const topicList = yield call();
    yield put({type: 'FETCH', payload: }) 
  }
}