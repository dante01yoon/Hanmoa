import BasicStore from "@store/BasicStore";
import { makeObservable, observable, action, flow } from "mobx";
import RootStore from "@store/RootStore";
import { Request } from "express";
import { ChatBox } from "@payload/chat";
import {createDummyChatData} from "@pages/room/dummy";
import { ISingleChat } from "src/models/chat";
import { isNil } from "lodash";


type ChatDataStatus = "pending" | "done";

class ChatStore extends BasicStore{
  @observable chatMessages: ISingleChat[] = [];
  @observable currentPage: number | null = 0;
  @observable hasEnteredBefore: boolean = false;
  @observable status: ChatDataStatus = "pending";
  @observable clickedCard: string = "";
  @observable currentChat?: ISingleChat = undefined;
  @observable next: boolean = false;

  constructor({root, state}: {root: RootStore, state: ChatStore}){
    super({root});
    makeObservable(this,);
    if(state){
      this.chatMessages = state.chatMessages;
      this.currentPage = state.currentPage;
      this.hasEnteredBefore = state.hasEnteredBefore;
      this.status = state.status;
      this.clickedCard = state.clickedCard;
      this.currentChat= state.currentChat;
      this.next = state.next;
    }
  }
  
  // @action async fetchChatMessages(req: Request ){
  //   const [error, response] = await this.api.GET<ChatBox>("/chat",{
  //     id: 1,
  //     pages: 1,
  //   });
  //   if(error){
  //     throw Error(error.error_message);
  //   }
  //   if(response){
  //     this.chatMessages = response.data
  //   }
  // }

  @action
  clickChatCard(cardCode: string){
    this.clickedCard = cardCode;
  };
  
  fetchSingleMessage = flow(function *(chatCardId: ISingleChat["chatCardId"]){
    this.status = "pending";
    
    const cachedChat = this.chatMessages.find( (item: ISingleChat) => item.chatCardId === chatCardId)
    
    if(!isNil(cachedChat)){
      this.currentChat = cachedChat;
    } else {
      try {
        const dummyChatMessage = createDummyChatData();
        const foundDummyChatMessage = dummyChatMessage.find(item => item.chatCardId === chatCardId);
        const targetMessage = yield new Promise<ISingleChat>((resolve) => {
          setTimeout(() => resolve(foundDummyChatMessage ?? dummyChatMessage[0]),500);
        });
        this.currentChat = targetMessage;
      } catch (error) {
        console.error(error);
      } finally {
        this.status = "done";
      }
    }
  })
  
  fetchNewChatMessage = flow(function *(
    roomCode: string,
  ){
    this.status = "pending";

    try {
      const newMessages = yield new Promise<ReturnType<typeof createDummyChatData>>(
        (resolve) => setTimeout(() => { resolve(createDummyChatData())}, 600)
      );
      this.chatMessages = newMessages;
      this.next = false;
    } catch(error) {
      console.error(error);
    } finally {
      this.status = "done";
    }
  })

  fetchPreviousChatMessage = flow(function *(){
    this.status = "pending";

    try {
      const newMessages = yield new Promise<ReturnType<typeof createDummyChatData>>(
        (resolve) => setTimeout(() => {resolve(createDummyChatData())},600)
      );
      this.chatMessages = [...newMessages, ...this.chatMessages, ];
    } catch (e){
      console.error(e);
    } finally {
      this.status = "done";
    }
  });

}

export default ChatStore;