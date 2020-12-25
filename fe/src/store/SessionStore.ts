import { computed, makeObservable, action, observable, runInAction } from "mobx"; 
import RootStore from "./RootStore";
import {UserPayload} from "src/payload/user";
import BasicStore from "./BasicStore"; 
import { Request } from "express";
import { setCookie } from "@utils/cookie";
class SessionStore extends BasicStore{
  @observable curUserCode: string | null | undefined = null;
  @observable waitingForServer: boolean = false;
  @observable user: UserPayload["profile"] | undefined | null = null; 

  constructor({root, state}:{root: RootStore, state: SessionStore}){
    super({root}); 
    makeObservable(this);
    if(state){
      this.curUserCode = state.curUserCode;
      this.waitingForServer = state.waitingForServer;
      this.user = state.user;
    }
  }

<<<<<<< HEAD
  async fetch(req?: Request){
    try{
      const [error, response] = await this.api.GET<UserPayload>(`/users/me`,{},{
        headers: {
          cookie: req && JSON.stringify(req.cookies),
        }
      });
      if(error){
        console.log("error in await fetch : ", error);
      }
      console.log("response: ", response);
      if(response){
        this.feedFetch(response.data);
      }
      if(error){
        throw new Error(error.error);
      }
    } catch(e){
      console.log("e in fetch:", e);
      throw new Error(e.error);
=======
  @action
  async fetch(req: Request){
    this.api.GET<UserPayload>(`/users/token`, {
      cookies: req.cookies,
    })
  }
  @action
  async fetchSignIn(accessCode: string){
    const [_, fetchSignInResult] = await this.signIn(accessCode);
    if(fetchSignInResult){
      this.curUserCode = fetchSignInResult?.data.id; 
      
>>>>>>> 7b1a554... Update: POST signIn 작성 -오류 없음
    }
  }
  
  @computed get isSignedIn(){
    return !!this.curUserCode; 
  }
  
<<<<<<< HEAD
  @action feedFetch(currentUser: UserPayload){
    this.user = currentUser.profile;
    this.curUserCode = currentUser.profile.id;
  };
  
  async fetchSignIn(accessCode: string){
    const [error, result] = await this.api.POST<UserPayload>('/users/signIn',{
=======
  async signIn(accessCode: string){
    return await this.api.POST<UserPayload>('/users/signIn',{
>>>>>>> 7b1a554... Update: POST signIn 작성 -오류 없음
      code: accessCode,
    },{
      withCredentials: true
    });
    if(result){
      this.feedFetch(result.data);
    }
    if(error){
      throw Error(error.error);
    }
  }

  @action async fetchSignOut(){
    setCookie("_hm_guit", "");
    this.curUserCode = null;
  }
  
  @action
  async update(req: Request | null = null){
    try {
      const [error, response] = await this.api.POST<UserPayload>('/auth/update',{
      },{
        
      })
      if( error ){
        throw new Error(error.error);
      }
      if(response){
        runInAction(() => {this.curUserCode = response.data.profile.id});
      };
    } catch(e){
      throw new Error(e); 
    }
  } 
}

export default SessionStore;