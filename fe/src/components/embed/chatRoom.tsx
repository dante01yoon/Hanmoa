import React, {FC, useState, ReactNode } from 'react';
import styled from 'styled-components';

const StyledSelf = styled.div`
  display: flex; 
`; 
const StyledEnterContainer= styled.div`
  display: flex;
`;


interface Props {
  children: ReactNode
}

export const EmbedChatRoom:FC<Props> = ({
  children: ReactNode
}) => {
  
  

  return(
    <StyledSelf>


      <StyledEnterContainer>
      
      </StyledEnterContainer>    
    </StyledSelf>
  )

}

export default EmbedChatRoom; 