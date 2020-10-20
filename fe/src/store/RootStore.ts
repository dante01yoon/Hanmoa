import ApiStore from "./ApiStore";
import SessionStore from "./SessionStore";

class RootStore {
  sessionStore: SessionStore;
  apiStore: ApiStore;
  
  constructor() {
    this.sessionStore = new SessionStore(this); 
    this.apiStore = new ApiStore(this);
  }
}

export default RootStore; 