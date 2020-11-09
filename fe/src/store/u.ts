import storeSpec from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";
import SessionStore from "./SessionStore";

export interface ReducedStore {
  sessionStore: Readonly<SessionStore>; 
  [key: string]: Readonly<BasicStore>;
}

const rootStore = new RootStore();

export const createStore = (storeSpecList: typeof storeSpec) => {
  return {...rootStore.reducedStore}
}
