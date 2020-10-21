import ApiStore from "./ApiStore";
import SessionStore from "./SessionStore";

class RootStore {
  sessionStore: SessionStore;
  api: ApiStore;
  
  constructor() {
    this.sessionStore = new SessionStore(this); 
    this.api = new ApiStore(this);
  }
}

export default RootStore; 