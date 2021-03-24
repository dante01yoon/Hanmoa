import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable } from "mobx";
import RootStore from "@store/RootStore";
import { GetRoomPayload, GetRoomsPayload } from "@payload/index";


export default class RoomStore extends BasicStore {
  @observable roomList: GetRoomsPayload["rooms"] | null;
  @observable currentRoom: GetRoomPayload["room"];
  @observable homeRoomList: GetRoomsPayload["rooms"] | null;
  @observable currentTopic: string | null;
  @observable page: number | null;

  constructor({root, state}: { root: RootStore, state: RoomStore}){
    super({root});
    makeObservable(this);
    this.homeRoomList = state?.homeRoomList ?? null;
    this.roomList = state?.roomList ?? null;
    this.currentRoom = state?.currentRoom;
    this.currentTopic = state?.currentTopic;
    this.page = state?.page;
  }

  async fetchRooms(category?: string, page:number = 0){
    const [error,response] = await this.api.GET<GetRoomsPayload>(`/room/${category}?page=${page}`);
    if(error){
      throw Error(error.error)
    }
    if(response && response.success){
      const { data } = response
      this.feedFetchRooms(data.rooms)
      this.setPage(page++);
      category ? this.setCurrentTopic(category) : this.setCurrentTopic(null)
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
  setPage(page: number){
    this.page = page;
  }

  @action.bound
  setCurrentTopic(topic: string | null){
    this.currentTopic = topic;
  }

  @action.bound
  feedFetchRooms(rooms: GetRoomsPayload["rooms"]){
    if(rooms){
      console.log("rooms: ", rooms);
      this.roomList = this.roomList ? [...this.roomList, ...rooms] : this.roomList;
    }
  }
  
  @action.bound
  feedFetchRoom(room: GetRoomPayload["room"]){
    this.currentRoom = room;
  }

}

