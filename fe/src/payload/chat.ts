import { Profile } from "./user";

export interface Writer {
  profile: Profile
  [key: string]: any;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  message: string;
  time: string;
  writer: Writer;
  image?: string | null;
}

export interface ChatMessagePayload {
  messages: ChatMessage[];
}