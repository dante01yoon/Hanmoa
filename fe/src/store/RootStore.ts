import ApiStore from "./ApiStore";
import SessionStore from "./SessionStore";
import storeSpec, { SingleStoreObject } from "./storeSpec";
import { ReducedStore } from "./u";

class RootStore {
  reducedStore: ReducedStore;
  
  constructor(){
    this.reducedStore = storeSpec.reduce((reducedStore: ReducedStore, entry: SingleStoreObject) => {
      if(!reducedStore[entry.key]){
        reducedStore[entry.key] = new entry.class(this);
      }
      return reducedStore
    }, {})
  }
}

export default RootStore; 