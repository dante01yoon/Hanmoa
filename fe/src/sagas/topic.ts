import * as Effects from 'redux-saga/effects';
import { TopicName, TopicData} from '@models/topic';
import { dummyData } from '@pages/home/dummy';
import { TopicEnum, topicCreator, FetchAction } from '@store/topic';
const { takeLatest, put, all,fork, delay } = Effects; 
const call: any = Effects.call;

const dummyTopicData = Object.assign({
  topic: 'etc',
  data: dummyData()
}, )
function topicDummy<TopicData>(url: string): Promise<TopicData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => 
      resolve(dummyTopicData)  
    , 700);  
  })   
} 

function* fetchTopic(action: FetchAction){
  try{
    yield put(topicCreator.load()); 
    const topicList = yield call(topicDummy, action.url);
    yield put(topicCreator.success(topicList));
  } catch(error){
    throw new Error(`Error exist in fetchTopic function`); 
  }
}

function* fetchTopicWatcher() {
  yield takeLatest(TopicEnum.FETCH_TOPIC, fetchTopic);
}
export function* topicSaga(){
  all([
    fork(fetchTopicWatcher), 
  ])
}