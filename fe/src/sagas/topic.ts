import { takeLatest, call, put, all,fork, delay } from 'redux-saga/effects';
import { TopicName, Topic, TopicList} from '@models/topic';
import { dummyData } from '@pages/home/dummy';
import { TopicEnum, topicCreator } from '@store/topic';
const dummyTopicData = Object.assign({
  topic: 'etc',
  data: dummyData()
}, )
function topicDummy() {
  return setTimeout(() => {
    return dummyTopicData
  }, 700);     
} 

function* fetchTopic(action){
  try{
    yield put(topicCreator.load()); 
    const topicList = yield call(topicDummy);
    yield put(topicCreator.success(topicList));
  } catch(error){
    throw new Error(`Error exist in fetchTopic function`); 
  }
}

function* fetchTopicWatcher() {
  yield takeLatest(TopicEnum.FETCH_TOPIC, fetchTopic);
}
function* topicSaga(){
  all([
    fork(fetchTopicWatcher), 
  ])
}