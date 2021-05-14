import { ChatMessage } from "@payload/.";
import SessionStore from "@store/SessionStore";

class Chat {
  private chatMessage: ChatMessage;

  constructor(
    initialState: {
      sessionStore: SessionStore;
    } & Omit<ChatMessage, "writer">
  ) {
    const { sessionStore, ...restState } = initialState;
    this.chatMessage = {
      ...restState,
      writer: {
        profile: sessionStore.userProfile!,
      }
    };
  }

  get getChatMessage() {
    return this.chatMessage;
  }
}

export default Chat;