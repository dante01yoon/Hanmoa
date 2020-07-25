import React, { FC } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { loginReducer, topicReducer } from "@store/reducers";
import rootSaga from "src/sagas";

export type TRootReducerKey = "topic" | "user";

// root reducer
export const rootReducer = combineReducers({
  topic: topicReducer,
  user: loginReducer,
});
// root store type
export type RootState = ReturnType<typeof rootReducer>;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
//saga
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const rootStore = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return rootStore;
};

const rootStore = configureStore();

export const ReduxProvider: FC = ({ children }) => {
  return <Provider store={rootStore}>{children}</Provider>;
};
