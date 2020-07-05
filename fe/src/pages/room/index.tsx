import React, { FC, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import dummyChatData from "./dummy";
import ChatCard from "@components/chat/card";
import {EmbedChatRoom} from "@components/embed/chatRoom"; 

const StyledSelf = styled.section`

`;

const StyledArticle = styled.article`
  
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


  return (
    <StyledSelf>
      <StyledArticle>
        <EmbedChatRoom>
          {renderChatContent()}
        </EmbedChatRoom>
      </StyledArticle>
      <StyledArticle>

      </StyledArticle>
    </StyledSelf>
  )
}

export default RoomPage;