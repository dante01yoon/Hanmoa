export * from "./type";

import { all } from "redux-saga/effects";
import { topicSaga } from "./topic";
import { loginSaga } from "./user";

function* rootSaga() {
  yield all([topicSaga(), loginSaga()]);
}

export default rootSaga;
