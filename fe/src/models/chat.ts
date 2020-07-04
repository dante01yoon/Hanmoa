import IUser from './user';

export interface ISingleChat extends Omit<IUser, "createdAt, modifedAt">{
  chatCardId: number;
  chatData: string;
  writtenAt: string;
}

interface IChat extends IUser{
  chatGroupId: number; 
  chatData: ISingleChat[];
}

export default IChat;