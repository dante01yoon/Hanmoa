import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";
import { ReducedStore } from "./u";

class BasicStore {
  api: typeof http;
  reducedStore: RootStore;

  constructor(rootStore: RootStore,{api}: {api: typeof http} = {api:http} ){
    this.api = api;
    this.reducedStore = rootStore; 
  }
}

export default BasicStore