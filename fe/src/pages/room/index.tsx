import React, { FC, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import dummyChatData from "./dummy";
import ChatCard from "@components/chat/card";
import EmbedChatRoom from "@components/embed/chatRoom"; 
import ChatPeopleContainer from "@components/embed/chatPeople";

const StyledSelf = styled.section`
  display:flex;
  justify-content: center;
`;

const StyledArticle = styled.article`
  & > div{
    background-color: ${p => p.theme.colors.yellow_white};
    padding: 48px 64px; 
    height: 100vh;
    overflow-y: auto;
  }
`;

const RoomPage: FC =({

}) =>{
  const { chatGroupId, chatData} = dummyChatData;

  const renderChatContent = ():ReactNode => {
    return (
      <> 
        {
          chatData.map(( value, ) => {
            const { chatCardId, ...rest } = value;
            return(
              <ChatCard 
                key={`single_chat_card::${chatCardId}`} 
                event={"none"}
                {...rest}
              />
            )
          })
        }
      </>  
    )
  } 

  const renderChatPeopleContent = ():JSX.Element=> {
    return(
      <>
        Hello
      </> 
    )
  }

  return (
    <StyledSelf>
      <StyledArticle>
        <EmbedChatRoom>
          {renderChatContent()}
        </EmbedChatRoom>
      </StyledArticle>
      <StyledArticle>
        <ChatPeopleContainer>
          {renderChatPeopleContent()}
        </ChatPeopleContainer>
      </StyledArticle>
    </StyledSelf>
  )
}

export default RoomPage;