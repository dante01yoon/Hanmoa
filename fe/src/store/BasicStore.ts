import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";

class BasicStore {
  api: typeof http;
  rootStore: RootStore;

  constructor(root: RootStore,{api}: {api: typeof http} = {api:http} ){
    this.api = api;
    this.rootStore = root; 
  }
}

export default BasicStore