import React, { useEffect, useRef, FC, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Styled from "./style";
import { Carousel } from "@components/carousel";
import { Slide } from "@components/carousel/slide";
import Card from "@components/card";
import SkeletonCard from "@components/skeleton/home";
import { Modal } from "src/components/modal";
import { ICardData } from "src/models/card";
import { useModal } from "@utils/modal/useModal";
import {useMobxStores, MobxStores} from "@utils/store/useStores"; 
import {observer} from "mobx-react";
import type { InitStoreOnServer } from "@utils/makeFetchStoreOnServer";
import { GetRoomsPayload, GetRoomPayload } from "@payload/index";
import isNil from "lodash/isNil";

import adobe from "src/asset/adobe.jpg";
import netflix_phone from "src/asset/netflix_phone.jpg";
import netflix from "src/asset/netflix.jpg";

const { RoomContainer } = Styled;

interface HomePageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    topicStore: MobxStores["topicStore"];
    roomStore: MobxStores["roomStore"];
  }>
}

const HomePage: FC & HomePageInitStoreOnServer = ({}) => {
  const [isModal, setModal] = useModal();
  const { pathname } = useLocation();
  const homeRef = useRef<HTMLUListElement>(null);
  // TODO 나중에 Saga 로 roomStore을 교체시 사용 
  // const { data, isLoading } = useSelector((state: RootState) => state.topic);
  const { roomStore } = useMobxStores();
  const [roomList, setRoomList] = useState<GetRoomsPayload["rooms"]>(roomStore.homeRoomList)
  const [isLoading, setIsLoading ] = useState(isNil(roomList));

  useEffect(() => {
    if(!roomStore.homeRoomList){
     roomStore.fetchRooms()
      .then(({rooms}:{ rooms: any}) => {
        setRoomList(rooms);
        setIsLoading(false);
      }) 
    }
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
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => {
                  return <SkeletonCard key={`skeleton::${index}`} />;
                })
            : roomList?.map((room) => {
                return (
                  <Card
                    room={room}
                    key={room.id}
                    handleClick={() => handleClick(room)}
                  />
                );
              })}
        </RoomContainer>
      </section>
    </>
  );
};

HomePage.initStoreOnServer = (_,{ topicStore, roomStore }) => {
  return Promise.all([
    topicStore.fetchTopicList(),
    roomStore.fetchRooms(),
  ])
}

export default observer(HomePage);

