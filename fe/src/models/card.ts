import { Member } from './member';

export interface CardData {
  id: number, //방 고유 아이디 
  title: string, //방 제목
  description: string, // 방 내용
  host: Member, // 방장 
  author: Member,  // 방 만든 사람  
  createdAt: string, // 생성 날짜 
  modifiedAt: string, // 최근 수정 날짜 
  members: Member[], // 방 멤버 정보 
  full: number, // 입장 가능한 전체 인원 
  current: number, // 현 인원 
  category: string,// 주제 카테고리 
  imgUrl: string, // 커버 이미지 URL
  url: string, // 주소 
  block: boolean // 방 입장 가능여부  
}

