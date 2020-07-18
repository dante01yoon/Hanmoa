import React, { FC, useMemo, ReactNode } from "react";
import styled from "styled-components";
import ProfileImg from "src/asset/profile.svg";
import { ISingleChat } from "@models/chat";
import timeSlice from "@utils/chat/timeSlice";

const StyledListGroup = styled.ul`
  display: flex;
  margin-bottom: 24px;

  & > li {
    &:first-child {
      & + li {
  display: inline-block;
  margin-bottom: 16px;

  & > li {
    &:first-child {
      float: left;

      & + li {
        float: right;
        max-width: 240px;

        & > h3 {
          margin-bottom: 16px;
        }
      }
    }
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
`;

const StyledImage = styled.p<{
  image: string;
}>`
    display:inline-block;
    content: "";
    background-image: url("${ProfileImg}");
    width: 48px;
    height: 48px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const StyledChatContainer = styled.div`
  position: relative;
  margin: 16px 0;

  & > small {
    margin-left: 8px;
    font-size: 8px;
    position: absolute;
    bottom: -16px;
    width: 56px;
  }
`;
const StyledChatContentBox = styled.p`
  padding: 16px;
  background-color: ${(p) => p.theme.colors.whiteGray};
  min-width: 32px;
  min-height: 32px;
  line-height: 1;
  border-radius: 8px;
`;

const StyledDescription = styled.p`
  margin: 0 auto;
`;

type TEventType = {
  event: "join" | "leave" | "none";
};
interface IChatModelProps extends Omit<ISingleChat, "chatCardId"> {
  event: "join" | "leave" | "none";
}

const ChatCard: FC<IChatModelProps> = ({
  chatData,
  writtenAt,
  studentNumber,
  name,
  image,
  event,
}) => {
  const processingNumberAndName = useMemo(() => {
    // 학번, 이름
    return [studentNumber.toString().slice(1, 3), name];
  }, [studentNumber, name]);

  const renderNumberAndName = () => {
    const [joinNumber, name] = processingNumberAndName;
    return (
      <StyledName>
        {joinNumber}
        <span>{name}</span>
      </StyledName>
    );
  };

  const processingDate: string = useMemo(() => {
    // "2020-05-18T16:00:00Z"
    const { hours, minutes, AMOrPM } = timeSlice(writtenAt);
    const parsedTime = `${hours}:${minutes}`;
    return `${AMOrPM} ${hours}:${minutes}`;
  }, []);

  const classifyEvent = (event: "join" | "leave" | "none") => {
    switch (event) {
      case "join":
        return "입장";
      case "leave":
        return "퇴장";
      default:
        return 0;
    }
  };

  const renderChatBox = (event: "join" | "leave" | "none"): ReactNode => {
    const description = classifyEvent(event);
    if (!description) {
      return (
        <StyledChatContainer>
          <StyledChatContentBox>{chatData}</StyledChatContentBox>
          <small>{processingDate}</small>
        </StyledChatContainer>
      );
    } else {
      return (
        <StyledChatContainer>
          <StyledDescription>
            {`${studentNumber}학번 ${name} 님이 ${description}하셨습니다.`}
          </StyledDescription>
        </StyledChatContainer>
      );
    }
  };
  const isMyChatBox = (studentNumber: number) => {};
  const renderListGroup = (event: "join" | "leave" | "none"): JSX.Element => {
    const renderResult = !classifyEvent(event) ? (
      <>
        <StyledList>
          <StyledImage image={image} />
        </StyledList>
        <StyledList>
          <h3>{renderNumberAndName()}</h3>
          {renderChatBox(event)}
        </StyledList>
      </>
    ) : (
      <>
        <StyledList>{renderChatBox(event)}</StyledList>
      </>
    );
    return renderResult;
  };
  return <StyledListGroup>{renderListGroup(event)}</StyledListGroup>;
};

export default ChatCard;
