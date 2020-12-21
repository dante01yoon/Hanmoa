import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";
import {ReducedStore} from "./u";

class BasicStore {
  api: typeof http;
  rootStore: RootStore;

  constructor(rootStore: RootStore, ){
    this.api = http;
    this.rootStore = rootStore; 
  }
}

export default BasicStore