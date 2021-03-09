import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable } from "mobx";
import RootStore from "@store/RootStore";

class RoomStore extends BasicStore {
  @observable roomList: Array<any>;
  @observable currentRoom: Record<string,any>;
  
  constructor({root, state}: { root: RootStore, state: RoomStore}){
    super({root});
    makeObservable(this);
    this.roomList = state?.roomList;
    this.currentRoom = state?.currentRoom;
  }

  @action
  feedFetch(){
    this.roomList
  }
  
}