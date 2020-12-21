import {StoreSpecType} from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";
import SessionStore from "./SessionStore";
import ChatStore from "./ChatStore";

export interface ReducedStore {
  sessionStore: SessionStore; 
  chatStore: ChatStore;
  [key: string]: BasicStore | null;
}


export const createStore = (storeSpecList: StoreSpecType): ReducedStore => {
  
  const rootStore = new RootStore(storeSpecList);

  const reducedStore = storeSpecList.reduce((reducedSpec, singleSpec) => {
    reducedSpec[singleSpec.key] = new singleSpec.class(rootStore);
    return reducedSpec; 
  },{} as ReducedStore);

  return {...reducedStore}
}
