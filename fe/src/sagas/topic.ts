import * as Effects from "redux-saga/effects";
import { dummyData } from "@pages/home/dummy";
import { GET_TOPIC_ENUM } from "@store/actions";
import { createFetchEntity, createEntityAction } from "@sagas/common";
const { takeLatest, fork } = Effects;

const dummyTopicData = Object.assign({
  topic: "all",
  data: dummyData(),
});

const topicDummy = <TopicData>(): Promise<TopicData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(dummyTopicData), 700);
  });
};

const topicEntity = createEntityAction(GET_TOPIC_ENUM, topicDummy);

const fetchTopicSaga = createFetchEntity(topicEntity);

function* fetchTopicWatcher() {
  yield takeLatest(GET_TOPIC_ENUM.REQUEST, fetchTopicSaga);
}

export function* topicSaga() {
  yield fork(fetchTopicWatcher);
}
