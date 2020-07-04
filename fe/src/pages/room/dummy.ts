import IChat, {ISingleChat} from "@models/chat"; 

const createDummyChatData = () => {
  const data = [] as ISingleChat;
  for(let i = 0; i <10; i++){
    data.push(
      {
        chatCardId : i,
        chatData: "안녕하세요",
        writtenAt: "2020-05-18T16:00:00Z",
        chatGroupId:
      }
    )    
  }
  return data
}

const dummyChatData: IChat = {
  chatGroupId: 123123,
  chatData: createDummyChatData()
};

export default dummyChatData;