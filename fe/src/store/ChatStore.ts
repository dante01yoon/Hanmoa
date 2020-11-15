import BasicStore from "@store/BasicStore";
import { makeObservable, observable, action } from "mobx";
import RootStore from "@store/RootStore";
import { Request } from "express";
import { ChatMessages, ChatBox } from "@payload/chat";


class ChatStore extends BasicStore{
  @observable chatMessages: ChatBox;
  

  constructor(rootStore: RootStore){
    super(rootStore);
    makeObservable(this);
    this.chatMessages = [];
  }
  

  @action async fetchChatMessages(req: Request ){
    const [error, response] = await this.api.GET<ChatBox>("/chat",{
      id: 
    });
    if(error){
      throw Error(error.error_message);
    }
    if(response){
      this.chatMessages = response.data
    }
  }
  
}
