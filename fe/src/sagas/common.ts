import { IEntity, TApiEndpoint, IEntityAction } from "src/sagas";
import { put, call } from "redux-saga/effects";

export const createEntityAction = <R, S, F, PARAM extends any[], DATA>(
  entity: IEntity<R, S, F>,
  api: TApiEndpoint<PARAM, DATA>
) => ({
  ACTION: {
    REQUEST: () => ({ type: entity.REQUEST }),
    SUCCESS: (data: Partial<DATA>) => ({ type: entity.SUCCESS, payload: data }),
    FAILURE: () => ({ type: entity.FAILURE }),
  },
  API: api,
});

export function createFetchEntity<T extends IEntityAction<any>>({
  ACTION,
  API,
}: T) {
  return function* (...p: Parameters<T["API"]>) {
    try {
      const data = yield call(API, ...p);
      yield put(ACTION.SUCCESS(data));
    } catch {
      yield put(ACTION.FAILURE());
    }
  };
}
