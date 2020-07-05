import React, {FC, useState, ReactNode } from 'react';
import styled from 'styled-components';

const StyledSelf = styled.div`
   
`; 

const StyledEnterContainer= styled.div`
  display: flex;
`;

const StyledChatContainer= styled.div`
  display: flex;
`; 

interface IEmbedChatProps {
  children: ReactNode
}

export const EmbedChatRoom:FC<IEmbedChatProps> = ({
  children
}) => {

  return(
    <StyledSelf>
      <StyledChatContainer>
        {children}
      </StyledChatContainer>
      <StyledEnterContainer>
        
      </StyledEnterContainer>    
    </StyledSelf>
  )

}

export default EmbedChatRoom; 