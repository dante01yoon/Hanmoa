import {
  Topic,
  Profile,
  ChatMessage,
} from "./index"

export interface Room {
  id: string;
  topic: Topic;
  title: string;
  subTitle: string;
  // TODO 더미 이미지는 지금은 클라에서 처리하나 앞으로 서버에서 보내주는걸로
  imageUrl: string | null; // string 
  join: Array<{ profile: Profile }>;
  host: Profile;
  createdBy: Profile;
  messages: Array<ChatMessage> | null;
  current: number;
  capability: number;
  gradient: string;
  joinPossible: boolean; // TODO 방에 참여를 아직 안한건지, 단순히 아직 공석이 있는건지 구분이 안됨.  지금은 후자의 의미로 쓰임
  hasPassword: boolean;
  hasJoinedRoom: boolean | null;
}

// GET /room/only/${id}
export interface GetRoomPayload {
  room: Room | null;
};

// GET /room/:category

export interface GetRoomsPayload {
  rooms: Array<Room> | null;
}