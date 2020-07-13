import React, { FC, useMemo, ReactNode } from 'react'
import styled from 'styled-components';
import ProfileImg from "src/asset/google.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { ISingleChat } from "@models/chat"; 
// React.FC<React.SVGAttributes<SVGElement>>

// const convertSVGToString = ( SVG: JSX.Element) => {
//   return encodeURIComponent(renderToStaticMarkup(SVG));
// }
// const svgString = convertSVGToString(<ProfileImg/>); 

const StyledListGroup = styled.ul`
  display: inline-block;  
  &> li:first-child {
    display: flex;
  }
`;

const StyledList = styled.li`
  margin: 0 8px;
`;

const StyledName = styled.small`
  padding: 0 8px;
  margin: 8px;
  max-width: 40px;
  height: 16px;
   & > span {
    margin-left: 8px;
    display: table-cell;
    vertical-align: middle;
   }
` ; 
// background-image: url("${src/asset/google.svg}");

const StyledImage = styled.p<{
  image: string
}>`
    display:inline-block;
    content: "";
    background-image: url("${ProfileImg}");
    width: 56px;
    height: 56px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
` 

const StyledChatContainer = styled.div`
  padding: 16px;
  background-color: ${p => p.theme.colors.whiteGray};
  min-width: 32px; 
  min-height: 32px;
  margin: 16px 0;

`;
const StyledChatBox = styled.div`

`;

const StyledDescription = styled.p`
  margin: 0 auto;
`;

type TEventType = {
  event: "join" | "leave" | "none"; 
} 
interface IChatModelProps extends Omit<ISingleChat , "chatCardId"> {
  event: "join" | "leave" | "none";
};

const ChatCard: FC<IChatModelProps> = ({
  chatData,
  writtenAt, 
  studentNumber,
  name,
  image,
  event,
}


) => {
  
  const processingNumberAndName = useMemo((
  ) => { // 학번, 이름 
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