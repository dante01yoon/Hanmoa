import { computed, makeAutoObservable, action } from "mobx"; 
import RootStore from "./RootStore";

class SessionStore {
  rootStore: RootStore; 
  curUserCode: number | null;
  waitingForServer: boolean;

  constructor(rootStore: RootStore, ){
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.curUserCode = null;
    this.waitingForServer = false;
  }

  fetch(){
      
  }

  @computed
  get isSignedIn(){
    return !!this.curUserCode; 
  }
  
  @action
  async signIn(){
   await this.rootStore.apiStore.postJson('/auth/signIn');
  }
  
  
}

export default SessionStore;