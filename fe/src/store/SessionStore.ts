import { computed, makeAutoObservable, action } from "mobx"; 
import RootStore from "./RootStore";
import {http} from "@apis/httpModule";
import {UserPayload} from "src/payload/user";

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
    const [_, fetchSignInResult] = await this.signIn(accessCode);
    if(fetchSignInResult){
      console.log("fetchSignInResult: ",fetchSignInResult);
      this.curUserCode = fetchSignInResult?.data.id; 
      
    }
  }

  @computed
  get isSignedIn(){
    return !!this.curUserCode; 
  }
  
  async signIn(accessCode: string){
    return await this.api.POST<UserPayload>('/auth/signIn',{
      code: accessCode
    });
  }
  
  
}

export default SessionStore;