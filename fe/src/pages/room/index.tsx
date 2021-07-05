import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { RouteComponentProps } from "react-router-dom"
import isNil from "lodash/isNil";
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
import { reqParser } from "@utils/parser";

const StyledSelf = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledArticle = styled.article`
  width: 100%;
  
  & > div:first-child {
    background-color: ${(p) => p.theme.colors.dark_sky_blue};
    max-height: 75vh;
    overflow-y: auto;
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
  const { chatStore, roomStore, sessionStore } = useMobxStores();
  const codeRef = useRef<string | null>(chatStore.currentCode || roomId)
  const chatRoomRef = useRef<HTMLElement>(null);
  const ioRef = useRef<IntersectionObserver>();
  const targetRef = useRef<HTMLElement>(null);
  const [isModal, setModal] = useModal();

  const { user: { studentId } } = useSelector((state: RootState) => state.user);

  const handleAuthenticate = () => {
    if (!roomStore.isAuthenticate(roomId)) {
      setModal({
        type: "OPEN",
        payload: {
          data: roomStore.currentRoom,
          visible: true,
        }
      })
    }
  }

  useEffect(() => {
    console.log("roomStore: ", roomStore);
    if (!chatStore.chatMessages.length) {
      chatStore.fetchNewChatMessage(roomId);
    }

    if (isNil(roomStore.currentRoom) || roomStore.currentRoom.id !== roomId) {
      roomStore.fetchRoom(roomId)
        .then((response: any) => {
          console.log("response: ", response);
          handleAuthenticate();
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

  const handleClickEnter = (roomId: string, studentNumber: string) => {
    return async () => {
      const response = await roomStore.fetchJoinRoom({ roomId, studentNumber });
      console.log("response: ", response);
    }
  }

  return (
    <>
      <section>
        <StyledSelf>
          <StyledArticle ref={chatRoomRef}>
            <EmbedChatRoom disabled={!roomStore.isAuthenticate(roomId)}>{
              // 비밀번호가 있으면 입력, 방 멤버인지 확인 후 렌더링
              roomStore.isAuthenticate(roomId) && roomStore.currentRoom?.hasJoinedRoom
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
        {isModal.visible && <Modal {...isModal.data} onClickEnter={handleClickEnter(roomId, sessionStore.userProfile.studentNumber)} />}
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
  promises.push(roomStore.fetchRoom(id, req));
  promises.push(chatStore.fetchNewChatMessage(id));
  return Promise.all(promises);
};

export default observer(RoomPage);
