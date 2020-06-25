import React, { FC, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {EmbedChatRoom} from '@components/embed/chatRoom'; 

const StyledSelf = styled.section`
`
const StyledArticle = styled.article`
  
`

const RoomPage: FC =({

}) =>{
  
  const renderChatContent = ():ReactNode => {
    return( 
      <>
        hello
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