import { computed, makeAutoObservable, action } from "mobx"; 
import ApiStore from "./ApiStore";
import RootStore from "./RootStore";

class SessionStore {
  rootStore: RootStore; 
  curUserCode: number | null;
  waitingForServer: boolean;
  api: ApiStore

  constructor(rootStore: RootStore, ){
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.curUserCode = null;
    this.waitingForServer = false;
    this.api = this.rootStore.api; 
  }

  @action
  async fetchSignIn(accessCode: string){
    const fetchSignInResult = await this.signIn(accessCode);
    debugger;
    console.log("fetchSignInResult", fetchSignInResult);        
  }

  @computed
  get isSignedIn(){
    return !!this.curUserCode; 
  }
  
  @action
  async signIn(accessCode: string){
    await this.api.postJson('/auth/signIn',{
      
    });
  }
  
  
}

export default SessionStore;