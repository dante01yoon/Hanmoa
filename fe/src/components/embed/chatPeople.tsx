import React, { FC, ReactNode} from 'react';
import styled from 'styled-components';

const StyledSelf = styled.div`
  width: 500px;
  height:75vh;
  ${p => p.theme.media.lb`
    width: 360px;
  `}
`;

interface IChatPeopleProps {
  children: ReactNode
}

const ChatPeople: FC<IChatPeopleProps> =({
  children
}) => {
  
  return(
    <StyledSelf>
      {children}
    </StyledSelf>
  )
}

export default ChatPeople;