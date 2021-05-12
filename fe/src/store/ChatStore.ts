import BasicStore from "@store/BasicStore";
import { makeObservable, observable, action, flow } from "mobx";
import RootStore from "@store/RootStore";
import { ChatMessagePayload, ChatMessage } from "@payload/.";
import { createDummyChatData } from "@pages/room/dummy";
import { APIResponse } from "@apis/types";

type ChatDataStatus = "pending" | "done";
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
  @observable status: ChatDataStatus = "pending";
  @observable clickedCard: string = "";
  @observable currentChat?: ChatMessage = undefined;
  @observable currentCode: string | null = null;
  @observable next: boolean = false;

  constructor({ root, state }: { root: RootStore, state: ChatStore }) {
    super({ root });
    makeObservable(this);

    if (state) {
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

  // fetchSingleMessage = flow(function* (chatCardId: ChatMessage["chatCardId"]) {
  //   this.status = "pending";

  //   const cachedChat = this.chatMessages.find((item: ChatMessage) => item.chatCardId === chatCardId)

  //   if (!isNil(cachedChat)) {
  //     this.currentChat = cachedChat;
  //   } else {
  //     try {
  //       const targetMessage = yield this.api.GET("/")
  //       this.currentChat = targetMessage;
  //       return targetMessage;
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       this.status = "done";
  //     }
  //   }
  // })

  @action
  fetchNewChatMessage = flow(function* (
    roomCode: string,
  ) {
    try {
      this.status = "pending";
      const [_, response]: APIResponse<ChatMessagePayload> = yield this.api.GET(`/room/chat/${roomCode}`, {
        page: 0,
      })

      if (response && response.success) {
        this.currentPage = 1;
        this.chatMessages = response.data.messages;
        this.currentCode = roomCode;
        this.status = "done";
        return response.data.messages;
      } else {
        throw Error(`error in /room/chat/${roomCode}`)
      }
    } catch (error) {
      this.status = "done";
      console.error(error);
    }
  })

  @action
  fetchPreviousChatMessage = flow(function* () {
    this.status = "pending";

    try {
      const newMessages = yield new Promise<ReturnType<typeof createDummyChatData>>(
        (resolve) => setTimeout(() => { resolve(createDummyChatData()) }, 600)
      );
      this.chatMessages = [...newMessages, ...this.chatMessages,];
    } catch (e) {
      console.error(e);
    } finally {
      this.status = "done";
    }
  });

}

export default ChatStore;