import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import throttle from "lodash/throttle";
import isNil from "lodash/isNil";
import type { InitStoreOnServer } from "@utils/makeFetchStoreOnServer";
import { useMobxStores, MobxStores } from "@utils/store/useStores";
import { observer } from "mobx-react";
import type { RouteComponentProps } from "react-router";
import { StyledRoomContainer } from "@pages/home/style";
import styled from "styled-components";
import Card from "@components/card";
import { Modal } from "@components/modal";
import PageLoading from "@components/loading/PageLoading";
import SkeletonCard from "@components/skeleton/home";
import useInfiniteScroll from "@components/infiniteScroll/InfiniteScroll";
import InfiniteScroll from "@components/infiniteScroll";
import { GetRoomPayload } from "@payload/index";
import { useModal } from "@utils/modal/useModal";

const StyledTopicRenderListRapper = styled.div`
  padding: 20px 0;
`;

const StyledAlternativeTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gray_white};
`;

interface TopicPageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    roomStore: MobxStores["roomStore"];
  }>
}

interface TopicPageProps extends RouteComponentProps<{ category: string }> {

}

const TopicPage: FC<TopicPageProps> & TopicPageInitStoreOnServer = ({ match }) => {
  const { roomStore } = useMobxStores();
  const { category } = match.params;
  const [isLoading, setIsLoading] = useState((roomStore.topic !== category) && roomStore.roomList);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const [isModal, setModal] = useModal();

  const throttleFetch = useCallback(throttle(() => {
    setIsScrollLoading(true);
    roomStore.fetchRooms(category)
      .then(() => {
        setIsScrollLoading(false);
      })
  }, 1200), []);

  const handleLoadMore = () => {
    throttleFetch()
  }

  useInfiniteScroll({
    target: infiniteScrollRef,
    cb: handleLoadMore,
  });


  useEffect(() => {
    // fixme 아래걸로 주석 해제
    if (!isNil(roomStore.roomList) || (roomStore.currentTopic !== category)) {
      setIsLoading(true);
      roomStore.fetchRooms(category, 0, true)
        .then(
          (data: any) => {
            console.log(data)
            setIsLoading(false);
          })
    }
  }, [category])

  const handleClick: (data: GetRoomPayload["room"]) => (e: React.MouseEvent<HTMLDivElement>) => void = (data) => (e) => {
    setModal({
      type: "OPEN",
      payload: {
        data,
        visible: true,
      },
    });
  };

  const renderCardList = () => {
    if (isLoading) {
      return Array(10)
        .fill(0)
        .map((_, index) => {
          return <SkeletonCard key={`skeleton::${index}`} />;
        })
    } else if (roomStore.roomList?.length > 0) {
      return roomStore.roomList.map((room: any, index: number) =>
        <Card
          room={room}
          key={`$::${index}-${category ?? "etc"}`}
          onClick={handleClick(room)}
        />
      )
    }
    return <StyledAlternativeTitle>앗! 만들어진 참여방이 없네요. {category}주제로 방을 만들어보세요! </StyledAlternativeTitle>
  }

  return (
    <>
      <section>
        <StyledRoomContainer>
          <StyledTopicRenderListRapper>
            {renderCardList()}
          </StyledTopicRenderListRapper>
        </StyledRoomContainer>
        {roomStore.next && isScrollLoading && <PageLoading width="30px" />}
      </section>
      <section>{isModal.visible && <Modal {...isModal.data} />}</section>
      {roomStore.next && <InfiniteScroll targetRef={infiniteScrollRef} />}
    </>
  )
}

TopicPage.initStoreOnServer = (req, { roomStore }) => {
  const { category } = req.params;
  return Promise.all([
    roomStore.fetchRooms(category),
  ])
}

export default observer(TopicPage);
