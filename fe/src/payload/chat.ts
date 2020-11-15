export interface ChatMessage{
  id: string;
  message: string;
  time: string;
  writer: string;
}

export type ChatBox = ChatMessage[];