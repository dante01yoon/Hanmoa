export type HostType = number[] | null; 
export type JoinType = number[] | null;  
export interface Member { 
  id: number
  name: string // 이름 
  createdAt: string // 생성날짜 
  modifiedAt: string  // 개인정보 수정 날짜 
  recentCreation : string // 최근 방 개설 날짜
  hostAt: HostType // 내가 현재 방장인 방의 id 
  joinAt: JoinType // 내가 현재 참여중인 방의 id
}