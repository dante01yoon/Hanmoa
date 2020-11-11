import {StoreSpecType} from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";
import SessionStore from "./SessionStore";

export interface ReducedStore {
  sessionStore: SessionStore | null; 
  [key: string]: BasicStore | null;
}


export const createStore = (storeSpecList: StoreSpecType) => {
  
  const rootStore = new RootStore(storeSpecList);

  const reducedStore = storeSpecList.reduce((reducedSpec, singleSpec) => {
    reducedSpec[singleSpec.key] = new singleSpec.class(rootStore);
    return reducedSpec; 
  },{} as ReducedStore)
  return {...reducedStore}
}
