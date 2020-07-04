import { CardData } from 'src/models/card';
import DummyImg from 'src/asset/netflix.jpg';
export const singleDummy: CardData = {
  id: 1, //방 고유 아이디 
  title: '오래 볼 분만 제발 오래 볼 문만 제발제발제발 오랫동안 같이 볼 분들만 들어와주세요 제발요.', //방 제목
  description: 'this is test room', // 방 내용
  host: {
    id: 1,
    image: "",
    studentNumber: 13, 
    name: 'jay', // 이름 
    createdAt: '123123123', // 생성날짜 
    modifiedAt: '123123',  // 개인정보 수정 날짜 
    recentCreation : '123123', // 최근 방 개설 날짜
    hostAt: [1], // 내가 현재 방장인 방의 id 
    joinAt: [1,2] // 내가 현재 참여중인 방의 id
  }, // 방장 
  author: {
    id: 2,
    image: "",
    studentNumber: 13,
    name: 'dante', // 이름 
    createdAt: '123123123', // 생성날짜 
    modifiedAt: '123123',  // 개인정보 수정 날짜 
    recentCreation : '123123', // 최근 방 개설 날짜
    hostAt: [1], // 내가 현재 방장인 방의 id 
    joinAt: [1,2] // 내가 현재 참여중인 방의 id
  },  // 방 만든 사람  
  createdAt: 'some day', // 생성 날짜 
  modifiedAt: 'some day', // 최근 수정 날짜 
  members: [
    {
      id: 1,
      studentNumber: 13, // 학번 
      name: 'jay', // 이름 
      image: '..', // 유저 이미지 
      createdAt: '123123123', // 생성날짜 
      modifiedAt: '123123',  // 개인정보 수정 날짜 
      recentCreation : '123123', // 최근 방 개설 날짜
      hostAt: [1,2], // 내가 현재 방장인 방의 id 
      joinAt: [1,2] // 내가 현재 참여중인 방의 id
    }
  ], // 방 멤버 정보 
  full: 4, // 입장 가능한 전체 인원 
  current: 3, // 현 인원 
  category: '음식 같이 나누어 먹기',// 주제 카테고리 
  imgUrl: `${DummyImg}`, // 커버 이미지 URL
  url: 'qwefwqsf1231232f', // 주소 
  block: false // 방 입장 가능여부  
}

export const dummyData: () => CardData[] = (
) => {
  let dummyArray = new Array(10).fill(0); 
  return dummyArray.map((_ , index) => Object.assign(
    singleDummy, { id: index}  )  
  )
}