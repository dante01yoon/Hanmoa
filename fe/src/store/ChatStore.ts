import BasicStore from "@store/BasicStore";
import { makeObservable, observable, action, flow } from "mobx";
import RootStore from "@store/RootStore";
import { ChatMessagePayload, ChatMessage } from "@payload/.";
import { createDummyChatData } from "@pages/room/dummy";
import { APIResponse } from "@apis/types";

export enum ChatDataStatus {
  PENDING = "pending",
  DONE = "done",
}

interface CreateChatParams {
  roomId: string;
  message: string;
  image?: string;
  writer: string;
}

class ChatStore extends BasicStore {
  @observable chatMessages: ChatMessage[] = [];
  @observable currentPage: number | null = 0;
  @observable hasEnteredBefore: boolean = false;
  @observable status: ChatDataStatus = ChatDataStatus.PENDING;
  @observable clickedCard: string = "";
  @observable currentChat?: ChatMessage = undefined;
  @observable currentCode: string | null = null;
  @observable next: boolean = false;

  constructor({ root, state }: { root: RootStore, state: ChatStore }) {
    super({ root, state });
    makeObservable(this);
    if (state) {
      console.log("status: ", state.status);
      this.chatMessages = state.chatMessages;
      this.currentPage = state.currentPage;
      this.hasEnteredBefore = state.hasEnteredBefore;
      this.status = state.status;
      this.clickedCard = state.clickedCard;
      this.currentChat = state.currentChat;
      this.next = state.next;
      this.currentCode = state.currentCode;
    }
  }

  @action
  resetChatOption() {
    this.currentPage = 0;
    this.chatMessages = [];
  }

  @action
  feedChatMessages(chat: ChatMessage) {
    this.chatMessages = [...this.chatMessages, chat];
  }

  async fetchCreateChat(params: CreateChatParams) {
    try {
      const [_, result] = await this.api.POST("/chat/create", {
        ...params
      });

      return result;
    } catch (error) {
      console.error("error in fetchCreateChat: ", error);
      throw Error(error);
    }
  }

  @action
  clickChatCard(cardCode: string) {
    this.clickedCard = cardCode;
  };

  @action
  fetchNewChatMessage = flow(function* (
    roomCode: string,
  ) {
    try {
      this.status = ChatDataStatus.PENDING;
      const [_, response]: APIResponse<ChatMessagePayload> = yield this.api.GET(`/room/chat/${roomCode}`, {
        page: 0,
      })

      if (response && response.success) {
        this.currentPage = 1;
        console.log("roomCode: ", roomCode);
        console.log("response in fetchNewChatMessage: ", response);
        this.chatMessages = response.data?.messages;
        this.currentCode = roomCode;

        return response.data?.messages;
      } else {
        throw Error(`error in /room/chat/${roomCode}`)
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.status = ChatDataStatus.DONE;
    }
  })

  @action
  fetchPreviousChatMessage = flow(function* () {
    try {
      const newMessages = yield new Promise<ReturnType<typeof createDummyChatData>>(
        (resolve) => setTimeout(() => { resolve(createDummyChatData()) }, 600)
      );
      this.chatMessages = [...newMessages, ...this.chatMessages,];
    } catch (e) {
      console.error(e);
    }
  });

}

export default ChatStore;