import { computed, makeObservable, action } from "mobx"; 
import RootStore from "./RootStore";
import {http} from "@apis/httpModule";
import {UserPayload} from "src/payload/user";
import BasicStore from "./BasicStore"; 
import { Request } from "express";
import { ReducedStore } from "./u";

class SessionStore extends BasicStore{
  curUserCode: string | null;
  waitingForServer: boolean;

  constructor(reducedStore: RootStore,){
    super(reducedStore); 
    makeObservable(this);
    this.curUserCode = null;
    this.waitingForServer = false;
  }

  @action
  async fetchSignIn(accessCode: string){
    const [_, fetchSignInResult] = await this.signIn(accessCode);
    if(fetchSignInResult){
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
  async update(req: Request | null = null){
    try {
      const [error, response] = await this.api.POST<UserPayload>('/auth/update',{
      },{
        
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

export default SessionStore;``