import BasicStore from "./BasicStore";
import SessionStore from "./SessionStore";

export interface SingleStoreObject{
  key: string;
  class: typeof BasicStore
}

const storeSpec: Array<SingleStoreObject> = [
  {
    key: "sessionStore",
    class: SessionStore,
  },
]
export type StoreSpecType = typeof storeSpec;
export default storeSpec;
