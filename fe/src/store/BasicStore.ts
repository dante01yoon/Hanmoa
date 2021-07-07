import { makeObservable } from "mobx";
import { http } from "src/apis/httpModule";
import RootStore from "./RootStore";

class BasicStore {
  api: typeof http;
  rootStore: RootStore;

  constructor({ root, state }: {
    root: RootStore;
    state?: any
  }) {
    makeObservable(this);
    this.api = http;
    this.rootStore = root;
  }
}

export default BasicStore