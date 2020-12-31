import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";
import {ReducedStore} from "./u";

class BasicStore {
  api: typeof http;
  rootStore: RootStore;

  constructor({root, state}: {
    root: RootStore;
    state?: any
  } ){
    this.api = http;
    this.rootStore = root; 
  }
}

export default BasicStore