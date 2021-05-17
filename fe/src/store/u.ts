import { StoreSpecType } from "./storeSpec";
import BasicStore from "./BasicStore";
import RootStore from "./RootStore";
import SessionStore from "./SessionStore";
import TopicStore from "./TopicStore";
import ChatStore from "./ChatStore";
import RoomStore from "./RoomStore";
import { http } from "@apis/httpModule";
import isNil from "lodash/isNil";

export interface ReducedStore {
  sessionStore: SessionStore;
  chatStore: ChatStore;
  topicStore: TopicStore;
  roomStore: RoomStore;
  http: typeof http;
  [key: string]: BasicStore | null | Record<string, any>;
}

export const createStore = ({
  storeSpec: storeSpecList,
  state = {},
}: {
  storeSpec: StoreSpecType,
  state?: Record<string, any>
}): ReducedStore => {

  const rootStore = new RootStore(storeSpecList);
  const reducedStore = storeSpecList.reduce((reducedSpec, singleSpec) => {
    if (!isNil(singleSpec.class)) {
      reducedSpec[singleSpec.key] = new singleSpec.class({ root: rootStore, state: state[singleSpec.key] });
    } else if (!isNil(singleSpec.module)) {
      reducedSpec[singleSpec.key] = singleSpec.module;
    }
    return reducedSpec;
  }, {} as ReducedStore);
  return { ...reducedStore }
}
