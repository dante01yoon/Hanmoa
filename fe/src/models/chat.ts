import IUser from './user';

export interface ISingleChat extends Omit<IUser, "id" | "createdAt" | "modifiedAt">{
  chatCardId: number;
  chatData: string;
  writtenAt: string;
}

interface IChat {
  chatGroupId: number; 
  chatData: ISingleChat[];
  chatPeople: IUser[]; 
}

export default IChat;