export interface ChatMessage {
  id: string;
  roomId: string;
  message: string;
  time: string;
  writer: string;
  image?: string | null;
}

export type ChatBox = ChatMessage[];