import { makeAutoObservable} from "mobx"; 
import RootStore from "./RootStore";

class SessionStore {
  rootStore: RootStore; 

  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetch(){
    
  }

  get isSignedIn(){
    return false;
  }

  
}

export default SessionStore;