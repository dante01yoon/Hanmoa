export interface ChatMessage{
  id: string;
  message: string;
  time: string;
  writer: string;
  image?: string;
}

export type ChatBox = ChatMessage[];