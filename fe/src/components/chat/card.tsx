import React, { FC, useMemo, ReactNode } from 'react'
import styled from 'styled-components';
import { ISingleChat } from "@models/chat"; 

const StyledListGroup = styled.ul`
  display: inline-block;  
`;

const StyledList = styled.li`
  margin: 0 8px;
`;

const StyledName = styled.small`
  padding: 0 8px;
  margin: 8px;
  max-width: 40px;
  height: 16px;
` ; 

const StyledImage = styled.p<{
  image: string
}>`
  & ::after{
    content: '',
    width: 56px;
    height: 56px;
    background: url(${p => p.image.length > 0 ? p.image : p.image});
    background-size: cover;
    bacground-position: center;
` 

const StyledChatContainer = styled.div`
  padding: 16px;
  background-color: ${p => p.theme.colors.whiteGray};
  min-width: 32px; 
  min-height: 32px;
  margin: 16px 0;

`;

const StyledDescription = styled.p`
  margin: 0 auto;
`;

type TEventType = {
  event: "join" | "leave" | "none"; 
} 
interface IChatModelProps extends ISingleChat{
  event: "join" | "leave" | "none";
};

const ChatCard: FC<IChatModelProps> = ({
  chatData,
  writtenAt, 
  chatCardId,
  studentNumber,
  name,
  image,
  event,
}


) => {
  
  const processingNumberAndName = useMemo((
  ) => {
    return [studentNumber.toString().slice(1,3), name];
  }, [studentNumber, name]);

  const renderNumberAndName = () => {
    const [ joinNumber, name ] = processingNumberAndName;
    return (
      <StyledName>
          {joinNumber}
          <span>{name}</span>
      </StyledName>    
    ); 
  }
  
  const processingDate: string = useMemo(() => {
    // "2020-05-18T16:00:00Z"
    const dateArray = writtenAt.split("T");
    const [ date, notParsedTime ] = dateArray;
    const [ hours, minutes, seconds ] = notParsedTime.split(":");
    const parsedTime = `${hours}:${minutes}`;
    return `${date}${parsedTime}`
  },[]);

  const renderChatBox = (event: "join" | "leave" | "none"): ReactNode => {
    const description = 
      event === "join" ?
        "입장" :
      event === "leave" ? 
        "퇴장" : ""; 
    if( event === "none"){
      return(
        <StyledChatContainer>
          {chatData}
          <small>{processingDate}</small>      
        </StyledChatContainer>
      )
    }
    else {
      return(
        <StyledChatContainer>
          <StyledDescription>
            {`${studentNumber}학번 ${name} 님이 ${description}하셨습니다.`}
          </StyledDescription>
        </StyledChatContainer>
      )
    }
  }

  const renderListGroup = ( event: "join" | "leave" | "none" ): JSX.Element => {
    const renderResult = event === "none" ?
      <>
        <StyledList>
          <StyledImage image={image}/>
        </StyledList>
        <StyledList>
          <h3>{renderNumberAndName()}</h3>
          {renderChatBox(event)}
        </StyledList>
      </> :
      <>
        <StyledList>
          {renderChatBox(event)}
        </StyledList>
      </>
  return renderResult; 
}
    return(
      <StyledListGroup>
        {renderListGroup(event)}
      </StyledListGroup>    
    )
}

export default ChatCard;