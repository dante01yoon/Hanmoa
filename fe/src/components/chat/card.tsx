import React, { FC, useMemo, ReactNode } from "react";
import styled from "styled-components";
import ProfileImg from "src/asset/profile.svg";
import timeSlice from "@utils/chat/timeSlice";
import { ChatMessage } from "@payload/.";
import ContentBox from "./contentBox";
import { useMobxStores } from "@utils/store/useStores";

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
  image: string | null;
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

interface IChatModelProps extends Omit<ChatMessage, "id"> {
  code: ChatMessage["id"];
  align: "left" | "right";
  event: "join" | "leave" | "none";
  ref: React.RefObject<HTMLElement> | undefined;
}

const ChatCard: FC<IChatModelProps> = ({
  ref,
  align,
  code,
  image,
  event,
  time,
  message,
  ...props
}) => {

  const { chatStore } = useMobxStores();
  const { writer: { profile: { name, email, studentNumber, picture } } } = props;
  console.log("name: ", name, "studentNumber: ", studentNumber);
  const processingNumberAndName = useMemo(() => {
    // 학번, 이름
    debugger;
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
    const { hours, minutes, AMOrPM } = timeSlice(time);
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

  const handleClickCard = () => {
    chatStore.clickChatCard(code);
  }

  const renderChatBox = (event: "join" | "leave" | "none"): ReactNode => {
    const description = classifyEvent(event);
    if (!description) {
      return (
        <StyledChatContainer>
          <ContentBox
            data={message}
            onClickCard={handleClickCard}
          />
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

  const renderListGroup = (event: "join" | "leave" | "none"): JSX.Element => {
    const renderResult = !classifyEvent(event) ? (
      <>
        <StyledList>
          <StyledImage image={picture} />
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
