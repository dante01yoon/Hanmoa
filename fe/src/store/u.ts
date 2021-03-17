import {StoreSpecType} from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";
import SessionStore from "./SessionStore";
import TopicStore from "./TopicStore";
import ChatStore from "./ChatStore";
import RoomStore from "./RoomStore";
export interface ReducedStore {
  sessionStore: SessionStore; 
  chatStore: ChatStore;
  topicStore: TopicStore;
  roomStore: RoomStore;
  [key: string]: BasicStore | null;
}


export const createStore = ({
  storeSpec: storeSpecList,
  state = {},
}: {
  storeSpec: StoreSpecType,
  state?: any
}): ReducedStore => {
  
  const rootStore = new RootStore(storeSpecList);
  const reducedStore = storeSpecList.reduce((reducedSpec, singleSpec) => {
    
    reducedSpec[singleSpec.key] = new singleSpec.class({root: rootStore, state: state[singleSpec.key]});
    return reducedSpec; 
  },{} as ReducedStore);
  return {...reducedStore}
}
