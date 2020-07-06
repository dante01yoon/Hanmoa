import React, {FC, useState, ReactNode } from 'react';
import styled from 'styled-components';

const StyledSelf = styled.div`
  width: 500px;
  background-color: ${p => p.theme.colors.yello_white};
`; 


const StyledChatContainer= styled.div`
  height:100%;
`; 

const StyledEnterContainer= styled.div`
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