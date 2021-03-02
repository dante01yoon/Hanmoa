import BasicStore from "./BasicStore";
import ChatStore from "./ChatStore";
import SessionStore from "./SessionStore";
import TopicStore from "./TopicStore";
export interface SingleStoreObject{
  key: string;
  class: typeof BasicStore
}

const storeSpec: Array<SingleStoreObject> = [
  {
    key: "sessionStore",
    class: SessionStore,
  },
  {
    key: "chatStore",
    class: ChatStore,
  },
  {
    key: "topicStore",
    class: TopicStore,
  }
]
export type StoreSpecType = typeof storeSpec;
export default storeSpec;
