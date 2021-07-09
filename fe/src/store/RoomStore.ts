import BasicStore from "@store/BasicStore";
import { action, observable, makeAutoObservable, runInAction, makeObservable } from "mobx";
import RootStore from "@store/RootStore";
import { GetRoomPayload, GetRoomsPayload, Profile } from "@payload/index";
import isNil from "lodash/isNil";
import { http } from "src/apis/httpModule";
import { Request } from "express";

export default class RoomStore extends BasicStore {
  roomList: Nullable<GetRoomsPayload["rooms"]> = null;
  homeRoomList: Nullable<GetRoomsPayload["rooms"]> = null;
  currentTopic: Nullable<string> = null;
  next: boolean = false;
  authenticate: Record<string, boolean> = {};
  currentRoom: GetRoomPayload["room"] = null;

  constructor({ root, state }: { root: RootStore, state: RoomStore }) {
    super({ root, state });
    makeObservable(this, {
      currentRoom: observable,
      roomList: observable,
      currentTopic: observable,
      next: observable,
      authenticate: observable,
    });
    this.homeRoomList = state?.homeRoomList ?? null;
    this.roomList = state?.roomList ?? null;
    this.currentRoom = state?.currentRoom ?? null;
    this.currentTopic = state?.currentTopic ?? null;
    this.authenticate = state?.authenticate ?? {};
  }

  @action.bound
  async fetchRooms({ category, page = 0, clear = false, req }: {
    category?: string;
    page?: number;
    clear?: boolean;
    req?: Request<any>,
  }) {
    const [error, response] = await this.api.GET<GetRoomsPayload>(
      `/room/${category}?page=${page}`,
      {},
      {
        headers: req && req.headers,
      }
    );

    if (error) {
      throw error;
    }

    if (response && response.success) {
      const { data } = response

      if (isNil(category)) {
        if (clear) {
          this.clearHomeRooms();
        }
        this.feedFetchHomeRooms(data.rooms);
      } else {
        console.log("!isNil category: ", category);
        if (clear) {
          this.clearRooms();
        }
        this.feedFetchRooms(data.rooms);
      }
      category ? this.setCurrentTopic(category) : this.setCurrentTopic(null)
      return response.data;
    }
    return Promise.resolve();
  }

  @action.bound
  async fetchRoom(id: string, req?: Request<any>) {
    const [error, response] = await this.api.GET<GetRoomPayload>(`/room/only/${id}`, {}, {
      headers: req && req.headers,
    });
    if (error) {
      throw Error(error.error);
    }
    if (response && response.success) {
      const { data } = response
      runInAction(() => this.feedFetchRoom(data.room));
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

  async fetchPostRoom(values: {
    studentNumber: Profile["studentNumber"];
    title: string;
    subTitle: string;
    imageUrl?: string;
    category: string;
    capability: string;
    hasPassword?: boolean;
    password?: string;
  }) {
    try {
      const [_, response] = await this.api.POST("/room/create", {
        ...values,
      });
      if (response && response.success) {
        return response.data;
      }
    }
    catch (error) {
      throw error[0];
    }
  }

  @action.bound
  async fetchJoinRoom(values: {
    roomid: string, studentNumber: string
  }) {
    const [error, response] = await this.api.PUT<any>("/room/join", values);

    if (error) {
      console.log("error: ", error);
      throw error;
    }

    if (response && response.success) {
      console.log("response: ", response);
      this.feedFetchRoom(response.data.room);
      return response.data;
    }
  }

  isAuthenticate(id: string) {
    if (this.authenticate.hasOwnProperty(id)) {
      return this.authenticate[id];
    }
    return false;
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
        if (!room.hasPassword || room.hasJoinedRoom) {
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

  feedFetchHomeRooms(rooms: GetRoomsPayload["rooms"]) {
    if (rooms) {
      if (this.homeRoomList) {
        this.homeRoomList = [...this.homeRoomList, ...rooms];
      }
      else {
        this.homeRoomList = rooms;
      }
      rooms.forEach((room) => {

        if (!room.hasPassword || room.hasJoinedRoom) {
          this.setAuthenticate(room.id, true);
        }
      })
    }
  }

  @action.bound
  clearHomeRooms() {
    this.homeRoomList = null;
  }

  feedFetchRoom(room: GetRoomPayload["room"]) {
    this.currentRoom = room;
    if (room && room.id) {
      this.setAuthenticate(room?.id, true);
    }
  }
}

