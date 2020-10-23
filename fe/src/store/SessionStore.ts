import { computed, makeAutoObservable, action } from "mobx"; 
import ApiStore from "./ApiStore";
import RootStore from "./RootStore";
import {http} from "@apis/httpModule";

class SessionStore {
  rootStore: RootStore; 
  curUserCode: number | null;
  waitingForServer: boolean;
  api: typeof http; 

  constructor(rootStore: RootStore, {api} = {api : http}){
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.curUserCode = null;
    this.waitingForServer = false;
    this.api = api; 
  }

  @action
  async fetchSignIn(accessCode: string){
    const fetchSignInResult = await this.signIn(accessCode);
    console.log("fetchSignInResult", fetchSignInResult);        
  }

  @computed
  get isSignedIn(){
    return !!this.curUserCode; 
  }
  
  @action
  async signIn(accessCode: string){
    await this.api.POST('/auth/signIn',{
    
    });
  }
  
  
}

export default SessionStore;