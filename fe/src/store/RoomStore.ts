import BasicStore from "@store/BasicStore";
import { action, observable, makeObservable } from "mobx";
import RootStore from "@store/RootStore";
import { GetRoomPayload, GetRoomsPayload } from "@payload/index";
import isNil from "lodash/isNil";
import { http } from "src/apis/httpModule";

export default class RoomStore extends BasicStore {
  @observable roomList: GetRoomsPayload["rooms"] | null;
  @observable currentRoom: GetRoomPayload["room"];
  @observable homeRoomList: GetRoomsPayload["rooms"] | null;
  @observable currentTopic: string | null;
  @observable next: boolean = false;
  @observable authenticate: Record<string, boolean> = {};

  constructor({ root, state }: { root: RootStore, state: RoomStore }) {
    super({ root, state });
    makeObservable(this);
    this.homeRoomList = state?.homeRoomList ?? null;
    this.roomList = state?.roomList ?? null;
    this.currentRoom = state?.currentRoom ?? null;
    this.currentTopic = state?.currentTopic ?? null;
  }

  async fetchRooms(category?: string, page: number = 0, clear: boolean = false) {
    const [error, response] = await this.api.GET<GetRoomsPayload>(`/room/${category}?page=${page}`);

    if (error) {
      throw Error(error.error)
    }

    if (response && response.success) {
      const { data } = response

      if (isNil(category)) {
        if (clear) {
          this.clearHomeRooms();
        }
        this.feedFetchHomeRooms(data.rooms);
      } else {
        if (clear) {
          this.clearRooms();
        }
        this.feedFetchRooms(data.rooms)
      }
      category ? this.setCurrentTopic(category) : this.setCurrentTopic(null)
      return response.data;
    }
    return Promise.resolve();
  }

  async fetchRoom(id: string, clear: boolean = false) {
    const [error, response] = await this.api.GET<GetRoomPayload>(`/room/only/${id}`);
    if (error) {
      throw Error(error.error);
    }
    if (response && response.success) {
      const { data } = response
      this.feedFetchRoom(data.room);

      if (data.room?.hasPassword && !this.authenticate[id]) {
        this.setAuthenticate(id, false);
      }
      return response.data;
    }
    return Promise.resolve();
  }

  async fetchAuthenticate(id: string, args: Record<string, any>) {
    try {
      const [error, response] = await http.POST(`/room/check/${id}`, {
        password: args.password
      });
      if (error && (error.status === 401 && !error.validate)) {
        const { callbackError } = args;
        if (!isNil(callbackError) && typeof callbackError === "function") {
          callbackError();
        }
      }
      if (response?.success) {
        this.setAuthenticate(id, true);
        const { callbackSuccess } = args;
        if (!isNil(callbackSuccess) && typeof callbackSuccess === "function") {
          callbackSuccess();
        }
      }
    } catch (e) {
      console.error("error in fetchAuthenticate");
      throw Error(e);
    }
  }

  isAuthenticate(id: string) {
    if (this.authenticate.hasOwnProperty(id)) {
      return this.authenticate[id];
    }
    return true;
  }

  @action.bound
  setAuthenticate(id: string, authenticated: boolean) {
    this.authenticate[id] = authenticated;
  }

  @action.bound
  setCurrentTopic(topic: string | null) {
    this.currentTopic = topic;
  }

  @action.bound
  feedFetchRooms(rooms: GetRoomsPayload["rooms"]) {
    if (rooms) {
      this.roomList = this.roomList ? [...this.roomList, ...rooms] : rooms;
      rooms.forEach((room) => {
        if (!room.hasPassword) {
          this.setAuthenticate(room.id, true);
        }
        else if (isNil(this.authenticate[room.id])) {
          this.setAuthenticate(room.id, false);
        }
      })
    }
  }

  @action.bound
  clearRooms() {
    this.roomList = null;
  }

  @action.bound
  feedFetchHomeRooms(rooms: GetRoomsPayload["rooms"]) {
    if (rooms) {
      if (this.homeRoomList) {
        this.homeRoomList = [...this.homeRoomList, ...rooms];
      }
      else {
        this.homeRoomList = rooms;
      }
    }
  }

  @action.bound
  clearHomeRooms() {
    this.homeRoomList = null;
  }

  @action.bound
  feedFetchRoom(room: GetRoomPayload["room"]) {
    this.currentRoom = room;
  }

}

