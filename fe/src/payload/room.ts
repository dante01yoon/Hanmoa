import { Topic } from "./index"



interface RoomPayload {
  roomId: string;
  category: Topic["category"];
  title: string;
  subTitle: string;
  imageUrl: string;
  
}