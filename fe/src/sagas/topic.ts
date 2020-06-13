import { takeLatest, call, put } from 'redux-saga/effects';
import { TopicName, Topic, TopicList} from '@models/topic';
import { dummyData } from '@pages/home/dummy';

const dummyTopicData = Object.assign({
  topic: 'etc',
  data: dummyData()
}, )
function topicDummy() {
  return setTimeout(() => {
    return dummyTopicData
  }, 700);     
} 

function* fetchTopic(url:string){
  try{
    const topicList = yield call(topicDummy);
    yield put({type: 'FETCH', payload: topicList}); 
  } catch(error){
    throw new Error(`Error exist in fetchTopic function`); 
  }
}

function* topicSaga(){
    takeLatest ('')
}