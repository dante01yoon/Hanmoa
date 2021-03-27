import React, { useEffect, useRef, FC, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import * as Styled from "./style";
import { Carousel } from "@components/carousel";
import { Slide } from "@components/carousel/slide";
import Card from "@components/card";
import SkeletonCard from "@components/skeleton/home";
import { Modal } from "@components/modal";
import useInfiniteScroll from "@components/infiniteScroll/InfiniteScroll";
import Loading from "@components/loading";
import InfiniteScroll from "@components/infiniteScroll";
import PageLoading from "@components/loading/PageLoading";
import { useModal } from "@utils/modal/useModal";
import {useMobxStores, MobxStores} from "@utils/store/useStores"; 
import { observer } from "mobx-react";
import type { InitStoreOnServer } from "@utils/makeFetchStoreOnServer";
import { GetRoomPayload } from "@payload/index";
import isNil from "lodash/isNil";
import throttle from "lodash/throttle";

import adobe from "src/asset/adobe.jpg";
import netflix_phone from "src/asset/netflix_phone.jpg";
import netflix from "src/asset/netflix.jpg";

const { RoomContainer } = Styled;

interface HomePageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    roomStore: MobxStores["roomStore"];
  }>
}

const HomePage: FC & HomePageInitStoreOnServer = ({}) => {
  const [isModal, setModal] = useModal();
  const { pathname } = useLocation();
  const homeRef = useRef<HTMLUListElement>(null);
  const infiniteScrollTargetRef = useRef<HTMLDivElement>(null);
  // TODO 나중에 Saga 로 roomStore을 교체시 사용 
  // const { data, isLoading } = useSelector((state: RootState) => state.topic);
  const { roomStore } = useMobxStores();
  const [isLoading, setIsLoading ] = useState(isNil(roomStore.homeRoomList));
  const [isHandleLoadMoreLoading, setIsHandleLoadMoreLoading] = useState(false); 
  
  const handleLoadMore = () => {
    setIsHandleLoadMoreLoading(true);
    throttleFetch();
  }

  const throttleFetch = useCallback(throttle(() => {
    roomStore.fetchRooms()
      .then(() => {
        setIsHandleLoadMoreLoading(false);
      })
  },1200),[]);

  useInfiniteScroll({
    target: infiniteScrollTargetRef,
    cb: handleLoadMore,
  });

  useEffect(() => {
    if(!roomStore.homeRoomList){
     roomStore.fetchRooms()
      .then(({rooms}:{ rooms: any}) => {
        console.log("rooms: ", rooms)
        console.log("homeRoomList:", roomStore.homeRoomList);
        setIsLoading(false);
      }) 
    }
    console.log("roomStore.homeRoomList: ", roomStore);
  },[]);

  const handleClick: (data: GetRoomPayload["room"]) => void = (data) => {
    setModal({
      type: "OPEN",
      payload: {
        data,
        visible: true,
      },
    });
  };

  return (
    <>
      <section>
        <Carousel>
          <Slide url={netflix} />
          <Slide url={adobe} />
          <Slide url={netflix_phone} />
        </Carousel>
      </section>
      <section>{isModal.visible && <Modal {...isModal.data} />}</section>
      <section >
        <RoomContainer ref={homeRef}>
          {isLoading || isNil(roomStore.homeRoomList)
            ? Array(10)
                .fill(0)
                .map((_, index) => {
                  return <SkeletonCard key={`skeleton::${index}`} />;
                })
            : roomStore.homeRoomList?.map((room: any) => {
                return (
                  <Card
                    room={room}
                    key={room.id}
                    handleClick={() => handleClick(room)}
                  />
                );
              })}
          {isHandleLoadMoreLoading && (
            <PageLoading width="30px"/>
          )}
        </RoomContainer>
        <InfiniteScroll targetRef={infiniteScrollTargetRef}/>
          
      </section>
    </>
  );
};

HomePage.initStoreOnServer = (_,{ roomStore }) => {
  return Promise.all([
    roomStore.fetchRooms(),
  ])
}

export default observer(HomePage);
