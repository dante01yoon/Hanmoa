import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable } from "mobx";
import RootStore from "@store/RootStore";
import { GetRoomPayload, GetRoomsPayload } from "@payload/index";


export default class RoomStore extends BasicStore {
  @observable roomList: GetRoomsPayload["rooms"] | null;
  @observable currentRoom: GetRoomPayload["room"];
  @observable homeRoomList: GetRoomsPayload["rooms"] | null;

  constructor({root, state}: { root: RootStore, state: RoomStore}){
    super({root});
    makeObservable(this);
    this.homeRoomList = state?.homeRoomList ?? null;
    this.roomList = state?.roomList ?? null;
    this.currentRoom = state?.currentRoom;
  }

  async fetchRooms(category?: string){
    const [error,response] = await this.api.GET<GetRoomsPayload>(`/room/${category}`);
    if(error){
      throw Error(error.error)
    }
    if(response && response.success){
      const { data } = response
      this.feedFetchRooms(data.rooms)
      return response.data;
    }
    return Promise.resolve();
  }

  async fetchRoom(id: string){
    const [error,response] = await this.api.GET<GetRoomPayload>(`/room/only/${id}`);
    if(error){
      throw Error(error.error);
    }
    if(response && response.success){
      const { data } = response
      this.feedFetchRoom(data.room);
      return response.data;
    }
    return Promise.resolve();
  }

  @action.bound
  feedFetchRooms(rooms: GetRoomsPayload["rooms"]){
    this.roomList = rooms;
  }
  
  @action.bound
  feedFetchRoom(room: GetRoomPayload["room"]){
    this.currentRoom = room;
  }

}

