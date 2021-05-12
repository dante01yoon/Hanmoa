import { computed, makeObservable, action, observable, runInAction } from "mobx";
import RootStore from "./RootStore";
import { Profile, User, GetUserPayload, PostUserPayload } from "src/payload";
import BasicStore from "./BasicStore";
import { Request } from "express";

class SessionStore extends BasicStore {
  @observable curUserCode: string | null | undefined = null;
  @observable waitingForServer: boolean = false;
  @observable userProfile: Profile | undefined | null = null;

  constructor({ root, state }: { root: RootStore, state: SessionStore }) {
    super({ root });
    makeObservable(this);
    if (state) {
      this.curUserCode = state.curUserCode;
      this.waitingForServer = state.waitingForServer;
      this.userProfile = state.userProfile;
    }
  }

  async fetch(req?: Request) {
    try {
      const [error, response] = await this.api.GET<GetUserPayload>(`/users/me`, {}, {
        headers: {
          cookie: req && JSON.stringify(req.cookies),
        }
      });
      console.log("response: ", response);

      if (error) {
        console.error("error in await fetch : ", error);
        throw new Error(error.error);
      }
      if (response) {
        this.feedFetch(response.data);
      }

    } catch (e) {
      console.log("e in fetch:", e);
      throw new Error(e.error);
    }
  }

  @computed get isSignedIn() {
    return !!this.curUserCode;
  }

  @action feedFetch(currentUser: GetUserPayload) {
    this.userProfile = currentUser.profile;
    this.curUserCode = currentUser.profile.id;
  };

  async fetchSignIn(accessCode: string) {
    const [error, result] = await this.api.POST<PostUserPayload>("/users/signIn", {
      code: accessCode,
    }, {
      withCredentials: true
    });
    if (result) {
      this.feedFetch(result.data);
    }
    if (error) {
      console.error("error in fetchSignIn");
      throw Error(error.error);
    }
  }

  async fetchSignOut() {
    await this.api.POST<Profile>("/users/signOut");
    location.replace("/");
  }

  @action
  async update(req: Request | null = null) {
    try {
      const [error, response] = await this.api.POST<PostUserPayload>('/auth/update', {
      }, {

      })
      if (error) {
        throw new Error(error.error);
      }
      if (response) {
        runInAction(() => { this.curUserCode = response.data.profile.id });
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default SessionStore;