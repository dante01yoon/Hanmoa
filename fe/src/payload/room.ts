import { 
  Topic,
  Profile,
  ChatMessage,
} from "./index"

export interface Room {
  id: string;
  topic: Topic["category"];
  category: string;
  title: string;
  subTitle: string;
  // TODO 더미 이미지는 지금은 클라에서 처리하나 앞으로 서버에서 보내주는걸로
  imageUrl: string | null; // string 
  join: Array<Profile>;
  host: Profile;
  createdBy: Profile;
  messages: Array<ChatMessage> | null;
}

// GET /room/only/${id}
export interface GetRoomPayload  {
  room: Room | null;
};

// GET /room/:category

export interface GetRoomsPayload {
  rooms: Array<Room> | null;
}