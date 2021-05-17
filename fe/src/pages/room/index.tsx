import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components";
import ChatCard from "@components/chat/card";
import EmbedChatRoom from "@components/embed/chatRoom";
import SkeletonCard from "@components/skeleton/card";
import { Modal } from "@components/modal";
import { InitStoreOnServer } from "@utils/makeFetchStoreOnServer";
import ChatStore from "@store/ChatStore";
import RoomStore from "@store/RoomStore";
import { ChatMessage } from "@payload/.";
import { Request } from "express";
import { observer } from "mobx-react";
import { MobxStores, useMobxStores } from "@utils/store/useStores";
import { ChatDataStatus } from "@store/ChatStore";
import { useModal } from "@utils/modal/useModal";
import blur from "src/asset/blur.png";
import { reqParser } from "@utils/parser";

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

const StyledBlurContainer = styled.div`
  filter: blur(10px);
  width: 100%;
  height: 100%;
`;

const StyledBlurImage = styled.div`

`;

interface RoomPageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    roomStore: MobxStores["roomStore"];
    chatStore: MobxStores["chatStore"];
  }>
}

interface RoomPageProps extends RouteComponentProps<{ id: string }> {
}

const RoomPage: FC<RoomPageProps> & RoomPageInitStoreOnServer = ({ match }) => {
  const roomId = match.params.id;
  const { chatStore, roomStore } = useMobxStores();
  const codeRef = useRef<string | null>(chatStore.currentCode || roomId)
  const chatRoomRef = useRef<HTMLElement>(null);
  const ioRef = useRef<IntersectionObserver>();
  const targetRef = useRef<HTMLElement>(null);
  const [isModal, setModal] = useModal();

  // 1. redux - useDispatch fetch method call 어디에다가 모듈화?
  // 2. response 오면 state 변경 ->
  // 3. RoomPage Container state propagation
  const { user: { studentId } } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!chatStore.chatMessages.length) {
      chatStore.fetchNewChatMessage(roomId);
    }

    if (!roomStore.isAuthenticate(roomId)) {
      setModal({
        type: "OPEN",
        payload: {
          data: roomStore.currentRoom,
          visible: true,
        }
      })
    }

    return () => {
      chatStore.resetChatOption();
    }
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

  const renderDummyChatContent = () => {
    return new Array(10)
      .fill(0)
      .map((_, key) => <SkeletonCard key={`single_chat_card_skeleton::${key}`} />)
  }

  const renderChatContent = (): ReactNode => {
    if (chatStore.status === ChatDataStatus.PENDING) {
      renderDummyChatContent()
    }
    /* 
    *  채팅 데이터가 처음 디비에서 전달해주는 값보다 많을 가능 성이 있을 때 
    *  20개 미만이라는 말은 더 이상 렌더링 할 채팅 데이터가 디비에 없다는 뜻.
    */
    // 
    return (
      <>
        {chatStore.chatMessages?.map((value: ChatMessage, index: number) => {
          const { id, ...rest } = value;
          return (
            <ChatCard
              code={id}
              ref={index === 0 ? targetRef : undefined}
              align={studentId ? 'right' : 'left'}
              key={`single_chat_card::${id}`}
              event={"none"}
              {...rest}
            />
          );
        })}
      </>
    );
  };
  useEffect(() => {
    console.log("authenticate: ", roomStore.authenticate)
    console.log("isAuthenticate: ", roomStore.isAuthenticate(roomId));
  }, [roomStore.isAuthenticate(roomId)]);

  return (
    <>
      <section>
        <StyledSelf>
          <StyledArticle ref={chatRoomRef}>
            <EmbedChatRoom disabled={!roomStore.isAuthenticate(roomId)}>{
              roomStore.isAuthenticate(roomId)
                ?
                renderChatContent()
                :
                <StyledBlurContainer>
                  {renderDummyChatContent()}
                </StyledBlurContainer>
            }</EmbedChatRoom>
          </StyledArticle>
        </StyledSelf>
      </section>
      <section>
        {isModal.visible && <Modal {...isModal.data} />}
      </section>
    </>
  );
};

RoomPage.initStoreOnServer = (req: Request<{ id: string }>, {
  chatStore,
  roomStore,
}: {
  chatStore: ChatStore;
  roomStore: RoomStore;
}) => {
  const id = reqParser(req, 1);
  const promises: Array<Promise<any>> = [Promise.resolve()];
  promises.push(roomStore.fetchRoom(id));
  promises.push(chatStore.fetchNewChatMessage(id));

  return Promise.all(promises);
};

export default observer(RoomPage);
