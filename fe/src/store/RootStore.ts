import ApiStore from "./ApiStore";
import SessionStore from "./SessionStore";
import { SingleStoreObject, StoreSpecType } from "./storeSpec";
import { ReducedStore } from "./u";

class RootStore {
  reducedStore: ReducedStore;
  
  constructor(storeSpec: StoreSpecType){
    
    this.reducedStore = storeSpec.reduce((reducedStore: ReducedStore, entry: SingleStoreObject) => {
      if(!reducedStore[entry.key]){
        reducedStore[entry.key] = null;
      }
      return reducedStore
    }, {} as ReducedStore)
  }
}

export default RootStore; 