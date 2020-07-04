import IUser from '../models/user';

export type HostType = number[] | null; 
export type JoinType = number[] | null;  
export interface IMember extends IUser{ 
  
  recentCreation: string // 최근 방 개설 날짜
  hostAt: HostType // 내가 현재 방장인 방의 id 
  joinAt: JoinType // 내가 현재 참여중인 방의 id
}

export default IMember