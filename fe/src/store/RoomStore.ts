import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable } from "mobx";
import RootStore from "@store/RootStore";

export default class RoomStore extends BasicStore {
  @observable roomList: Array<any> | null;
  @observable currentRoom: Record<string,any>;
  
  constructor({root, state}: { root: RootStore, state: RoomStore}){
    super({root});
    makeObservable(this);
    this.roomList = state?.roomList ?? null;
    this.currentRoom = state?.currentRoom;
  }

  async fetchRooms(category: string = "etc"){
    const [error,response] = await this.api.GET<any>(`/room/${category}`);
    if(error){
      throw Error(error.error)
    }
    if(response){
      const { data } = response
      this.feedFetchRooms(data?.rooms)
      return response.data;
    }
    return Promise.resolve();
  }

  async fetchRoom(id: string){
    const [error,response] = await this.api.GET<any>(`/room/only/${id}`);
    if(error){
      throw Error(error.error);
    }
    if(response){
      const { data } = response
      this.feedFetchRoom(data?.room);
      return response.data;
    }
    return Promise.resolve();
  }

  @action.bound
  feedFetchRooms(rooms: Array<any>){
    this.roomList = rooms;
  }
  
  @action.bound
  feedFetchRoom(room: any){
    this.currentRoom = room;
  }

}

