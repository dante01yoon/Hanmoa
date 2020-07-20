import * as effects from 'redux-saga/effects';
import { 
  LoginLoading,
  LoginSuccess
 } from '@store/user';
import { ActionCreatorsMapObject} from "redux";
import { LOGIN_ENUM } from '@store/user';
import { googleAuthRequest } from '@apis/auth'; 
import {GET_LOGIN_ENUM, getLoginActions, TLoginAction} from "@store/actions";
const { takeLatest, put , call, all ,fork, delay } = effects;

interface IEntity<R,S,F>{
    REQUEST: R;
    SUCCESS: S;
    FAILURE: F;
};


type TApiEndpoint<P extends any[], D> = (...p:P) => Promise<D>;

interface IActionOfEntity<T> extends ActionCreatorsMapObject<T>{
    [key: string]: (...arg: any[]) => T
}

interface IEntityAction<T>{
    ACTION: IActionOfEntity<T>;
    API: TApiEndpoint<any, any>
}

const createEntityAction = < R,S,F, PARAM extends any[], DATA> (
    entity: IEntity<R,S,F>,
    api: TApiEndpoint<PARAM,DATA>
) => ({
    ACTION:{
        REQUEST: () => ({type: entity.REQUEST}),
        SUCCESS: (data: Partial<DATA>) => ({type:entity.SUCCESS, payload: data}),
        FAILURE: () => ({type: entity.FAILURE})
    },
    API: api
})

type EntityAction<T extends IEntityAction<any>> = ReturnType<T['ACTION'][keyof T['ACTION']]>;

function createFetchEntity<T extends IEntityAction<any>>({ACTION, API}: T) {
    return function*(...p: Parameters<T["API"]>){
        try{
            yield put(ACTION.REQUEST());
            const data = yield call(API, ...p);
            yield put(ACTION.SUCCESS(data));
        } catch{
            yield put(ACTION.FAILURE());
        }
    }
}

const loginEntity = createEntityAction(GET_LOGIN_ENUM, googleAuthRequest);

const fetchLoginSaga = createFetchEntity(loginEntity);

function* fetchLoginWatcher() {
  yield takeLatest(GET_LOGIN_ENUM.REQUEST, fetchLoginSaga);
}
export function* loginSaga(){
  yield fork(fetchLoginWatcher); 
}