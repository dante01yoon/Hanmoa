import React, { FC, useState, ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {RootState} from "src/store";
import styled from "styled-components";
import dummyChatData from "./dummy";
import ChatCard from "@components/chat/card";
import EmbedChatRoom from "@components/embed/chatRoom";
import ChatPeopleContainer from "@components/embed/chatPeople";
import SkeletonCard from "@components/skeleton/card";
import IChat from "src/models/chat";
import makeFetchStoreOnServer from "@utils/makeFetchStoreOnServer";
import ChatStore from "@store/ChatStore";
import {Request} from "express";

const StyledSelf = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledArticle = styled.article`
  & > div:first-child {
    background-color: ${(p) => p.theme.colors.yellow_white};
    overflow-y: auto;
    max-height: 75vh;
  }
`;

const RoomPage: FC & {
  initStoreOnServer: Function;
} = ({}) => {
  const [chatDataState, setChatDataState] = useState({
    chatGroupId: 0,
    chatData: [],
    chatPeople: [],
  } as IChat);
  const chatRoomRef = useRef<HTMLElement>(null);
  const ioRef = useRef<IntersectionObserver>();
  const targetRef = useRef<HTMLElement>(null);
  const { chatGroupId, chatData } = chatDataState;
  // 1. redux - useDispatch fetch method call 어디에다가 모듈화?
  // 2. response 오면 state 변경 ->
  // 3. RoomPage Container state propagation

  const {user: {studentId}} = useSelector((state: RootState) => state.user);

  const fetchDummyData = () => {
    setTimeout(() => {
      setChatDataState(dummyChatData);
    }, 3000);
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  useEffect(() => {
    ioRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio === 0 ) {
          
        } 
      });
    },{
      root: chatRoomRef.current,
      threshold: 0,      
    });
    if(!targetRef || !targetRef.current ){
      return ;
    }else{
    ioRef.current.observe(targetRef.current);
    }

    return () => {
      if(ioRef.current){
        ioRef.current.unobserve(targetRef.current);
      }
    }
  });

  const renderChatContent = (): ReactNode => {
    if (!chatData.length) {
      const dummyArray = new Array(10).fill(0);
      return (
        <>
          {dummyArray.map((_, key) => {
            return <SkeletonCard key={`single_chat_card_skeleton::${key}`} />;
          })}
        </>
      );
    }
    return (
      <>
        {chatData.map((value) => {
          const { chatCardId, ...rest } = value;
          return (
            <ChatCard
              align={studentId ? 'right': 'left'}
              key={`single_chat_card::${chatCardId}`}
              event={"none"}
              {...rest}
            />
          );
        })}
      </>
    );
  };
 
  const renderChatPeopleContent = (): JSX.Element => {
    return <></>;
  };

  return (
    <StyledSelf>
      <StyledArticle ref={chatRoomRef}>
        <EmbedChatRoom>{renderChatContent()}</EmbedChatRoom>
      </StyledArticle>
      <StyledArticle>
        <ChatPeopleContainer>{renderChatPeopleContent()}</ChatPeopleContainer>
      </StyledArticle>
    </StyledSelf>
  );
};

RoomPage.initStoreOnServer = makeFetchStoreOnServer((req: Request, {chatStore}: {chatStore: ChatStore}) => {
  Promise.resolve(chatStore.fetchChatMessages(req));
});

export default RoomPage;
