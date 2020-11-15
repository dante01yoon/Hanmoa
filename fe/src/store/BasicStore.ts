import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";
import { ReducedStore } from "./u";

class BasicStore {
  api: typeof http;
  reducedStore: RootStore;

  constructor(rootStore: RootStore, ){
    this.api = http;
    this.reducedStore = rootStore; 
  }
}

export default BasicStore