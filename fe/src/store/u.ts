import storeSpec from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";

export interface ReducedStore {
  [key: string]: BasicStore;
}

const rootStore = new RootStore();

export const createStore = (storeSpecList: typeof storeSpec) => {
  return {...rootStore}
}
