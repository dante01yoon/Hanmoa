import IChat, {ISingleChat} from "@models/chat"; 
import IUser from "src/models/user";
import {nanoid} from "nanoid";

const dummyData: Omit<ISingleChat,"chatCardId">[] = [
    {
        chatData: "안녕하세요",
        writtenAt: "2020-05-18T16:00:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: ""
    },
    {
        chatData: "안녕하세요 반갑습니다.",
        writtenAt: "2020-05-18T16:10:00Z",
        name: 'jaewon',
        studentNumber: 21300492,
        image: ""
    },
    {
        chatData: "계좌번호는 국민 000-0000000000 이구요 오늘 자정까지 보내주시고 이 방에 올려주시면 감사하겠습니다.",
        writtenAt: "2020-05-18T16:11:00Z",
        name: 'jaewon',
        studentNumber: 21300492,
        image: ""
    },
    {
        chatData: "매달 결제일이 언제인가요?",
        writtenAt: "2020-05-18T17:00:00Z",
        name: 'Park',
        studentNumber: 21300612,
        image: ""
    },
    {
        chatData: "매달 26일이구요, 구독 취소하시려면 2일전에는 말씀해주셔야 합니다....",
        writtenAt: "2020-05-18T17:02:00Z",
        name: 'jaewon',
        studentNumber: 21300492,
        image: ""
    },
    {
        chatData: "보냈습니다",
        writtenAt: "2020-05-19T00:00:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: ""
    },
    {
        chatData: "보냈어용",
        writtenAt: "2020-05-19T00:10:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: ""
    },
    {
        chatData: "더미데이터",
        writtenAt: "2020-05-19T00:10:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: ""
    },
    {
        chatData: "더미데이터",
        writtenAt: "2020-05-19T00:10:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: ""
    },
    {
        chatData: "더미데이터",
        writtenAt: "2020-05-19T12:00:00Z",
        name: 'Kim',
        studentNumber: 21300512,
        image: "",
    },
]

export const createDummyChatData = (): ISingleChat[] => {
  return [
    ...dummyData.map((item) => {
      const newItem = { 
        ...item,
        chatCardId: nanoid(),
      }
      return newItem;
    })
  ];
}

const dummyChatPeople: IUser[] = [
    {
        id: nanoid(),
        studentNumber: 13,
        name: "윤재원",
        image: null,
        createdAt: "",
        modifiedAt: "",
    },
    {
        id: nanoid(),
        studentNumber: 14,
        name: "조재은",
        image: null,
        createdAt: "",
        modifiedAt: "",
    },
    {
        id: nanoid(),
        studentNumber: 15,
        name: "서상원",
        image: null,
        createdAt: "",
        modifiedAt: "",
    }
];

const dummyChatData: IChat = {
  chatGroupId: 123123,
  chatData: createDummyChatData(),
  chatPeople: dummyChatPeople
};

export default dummyChatData;