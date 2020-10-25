import { computed, makeAutoObservable, action } from "mobx"; 
import RootStore from "./RootStore";
import {http} from "@apis/httpModule";
import {UserPayload} from "src/payload/user";
import Cookies from "js-cookie";
import { createChainedFunction } from "@material-ui/core";

class SessionStore {
  rootStore: RootStore; 
  curUserCode: string | null;
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
      code: accessCode,
    },{
      withCredentials: true
    });
  }
  
  @action
  async update(){
    try {
      const [error, response] = await this.api.POST<UserPayload>('/auth/convert',{
        code: Cookies.get("hm_guit"),
      })
      if( error ){
        throw new Error(error.error_message);
      }
      if(response){
        this.curUserCode = response.data.id
      };
    } catch(e){
      throw new Error(e); 
    }
  } 
}

export default SessionStore;