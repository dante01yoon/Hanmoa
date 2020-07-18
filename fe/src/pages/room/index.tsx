import React, { FC, useState, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dummyChatData from "./dummy";
import ChatCard from "@components/chat/card";
import EmbedChatRoom from "@components/embed/chatRoom";
import ChatPeopleContainer from "@components/embed/chatPeople";
import SkeletonCard from "@components/skeleton/card";
import IChat from "src/models/chat";

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

const RoomPage: FC = ({}) => {
  const [chatDataState, setChatDataState] = useState({
    chatGroupId: 0,
    chatData: [],
  } as IChat);
  const { chatGroupId, chatData } = chatDataState;
  // 1. redux - useDispatch fetch method call 어디에다가 모듈화?
  // 2. response 오면 state 변경 ->
  // 3. RoomPage Container state propagation

  const fetchDummyData = () => {
    setTimeout(() => {
      setChatDataState(dummyChatData);
    }, 3000);
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

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
    return <>Hello</>;
  };

  return (
    <StyledSelf>
      <StyledArticle>
        <EmbedChatRoom>{renderChatContent()}</EmbedChatRoom>
      </StyledArticle>
      <StyledArticle>
        <ChatPeopleContainer>{renderChatPeopleContent()}</ChatPeopleContainer>
      </StyledArticle>
    </StyledSelf>
  );
};

export default RoomPage;
