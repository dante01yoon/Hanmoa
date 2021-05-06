import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import ChatCard from "@components/chat/card";
import EmbedChatRoom from "@components/embed/chatRoom";
import SkeletonCard from "@components/skeleton/card";
import { ISingleChat } from "src/models/chat";
import makeFetchStoreOnServer from "@utils/makeFetchStoreOnServer";
import ChatStore from "@store/ChatStore";
import { Request } from "express";
import { observer } from "mobx-react";
import { useMobxStores } from "@utils/store/useStores";
import getRoomCode from "@utils/chat/getCode";

const StyledSelf = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledArticle = styled.article`
  width: 100%;
  
  & > div:first-child {
    background-color: ${(p) => p.theme.colors.dark_sky_blue};
    overflow-y: auto;
    max-height: 75vh;
  }
`;

const RoomPage: FC & {
  initStoreOnServer: Function;
} = ({ }) => {
  const { chatStore } = useMobxStores();
  console.log("chatStore: ", chatStore);
  const chatRoomRef = useRef<HTMLElement>(null);
  const ioRef = useRef<IntersectionObserver>();
  const targetRef = useRef<HTMLElement>(null);
  // 1. redux - useDispatch fetch method call 어디에다가 모듈화?
  // 2. response 오면 state 변경 ->
  // 3. RoomPage Container state propagation

  const { user: { studentId } } = useSelector((state: RootState) => state.user);

  const fetchDummyData = async (code: string) => {
    await chatStore.fetchNewChatMessage();
  };

  const history = useHistory();

  useEffect(() => {
    console.log("history", history);
    fetchDummyData(getRoomCode(history.location.pathname));
  }, []);

  useEffect(() => {
    ioRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 1) {
          if (targetRef && targetRef.current) {
            targetRef.current.scrollTop + targetRef.current.offsetTop >= targetRef.current.scrollHeight * 0.8;
          }
        }
      });
    }, {
      root: chatRoomRef.current,
      threshold: 0,
    });
    if (!targetRef || !targetRef.current) {
      return;
    } else {
      ioRef.current.observe(targetRef.current);
    }

    return () => {
      if (ioRef.current && targetRef && targetRef.current) {
        ioRef.current.unobserve(targetRef.current);
      }
    }



  }, []);

  const renderChatContent = (): ReactNode => {
    console.log("in RenderChatContent")
    if (!chatStore || !chatStore.chatMessages.length) {
      const dummyArray = new Array(10).fill(0);
      return (
        <>
          {dummyArray.map((_, key) => {
            return <SkeletonCard key={`single_chat_card_skeleton::${key}`} />;
          })}
        </>
      );
    }
    /* 
    *  채팅 데이터가 처음 디비에서 전달해주는 값보다 많을 가능 성이 있을 때 
    *  20개 미만이라는 말은 더 이상 렌더링 할 채팅 데이터가 디비에 없다는 뜻.
    */
    // 
    return (
      <>
        {chatStore.chatMessages.map((value: ISingleChat, index: number) => {
          const { chatCardId, ...rest } = value;
          return (
            <ChatCard
              code={value.chatCardId}
              ref={index === 0 ? targetRef : undefined}
              align={studentId ? 'right' : 'left'}
              key={`single_chat_card::${chatCardId}`}
              event={"none"}
              {...rest}
            />
          );
        })}
      </>
    );
  };

  return (
    <StyledSelf>
      <StyledArticle ref={chatRoomRef}>
        <EmbedChatRoom>{renderChatContent()}</EmbedChatRoom>
      </StyledArticle>
      {/* <button onClick={fetchDummyData}>click Me</button> */}
    </StyledSelf>
  );
};

RoomPage.initStoreOnServer = makeFetchStoreOnServer((req: Request, { chatStore }: { chatStore: ChatStore }) => {
  // Promise.resolve(chatStore.fetchNewChatMessage());
});

export default observer(RoomPage);
