import * as effects from "redux-saga/effects";
import { googleAuthRequest } from "@apis/auth";
import { GET_LOGIN_ENUM } from "@store/actions";
import { createFetchEntity, createEntityAction } from "@sagas/common";
const { takeLatest, fork } = effects;

const loginEntity = createEntityAction(GET_LOGIN_ENUM, googleAuthRequest);

const fetchLoginSaga = createFetchEntity(loginEntity);

function* fetchLoginWatcher() {
  yield takeLatest(GET_LOGIN_ENUM.REQUEST, fetchLoginSaga);
}
export function* loginSaga() {
  yield fork(fetchLoginWatcher);
}
