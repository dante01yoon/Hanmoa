import BasicStore from "@store/BasicStore";
import { makeObservable, observable, action } from "mobx";
import RootStore from "@store/RootStore";
import { Request } from "express";
import { ChatBox } from "@payload/chat";


class ChatStore extends BasicStore{
  @observable chatMessages: ChatBox;
  @observable currentPage: number;

  constructor(rootStore: RootStore){
    super(rootStore);
    makeObservable(this);
    this.chatMessages = [];
    this.currentPage = this.rootStore.reducedStore.sessionStore.hasRead;
  }
  

  @action async fetchChatMessages(req: Request ){
    const [error, response] = await this.api.GET<ChatBox>("/chat",{
      id: 1,
      pages: 1,
    });
    if(error){
      throw Error(error.error_message);
    }
    if(response){
      this.chatMessages = response.data
    }
  }
  
  @action async fetchNewChtMessage(){
    
  }
}

export default ChatStore;