import React, { FC, useEffect, useState } from 'react';
import type { InitStoreOnServer } from "@utils/makeFetchStoreOnServer";
import { useMobxStores, MobxStores } from "@utils/store/useStores";
import { observer } from "mobx-react";
import type { RouteComponentProps } from "react-router";
import { RoomContainer } from "@pages/home/style";
import { Card } from "@components/card";
import isNil from "lodash/isNil";
import SkeletonCard from "@components/skeleton/home";

interface TopicPageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    roomStore: MobxStores["roomStore"];
  }>
}

interface TopicPageProps extends RouteComponentProps<{category: string}>{
  
}

const TopicPage:FC<TopicPageProps> & TopicPageInitStoreOnServer = ({match}) =>{
  const { roomStore } = useMobxStores();
  const { category } = match.params;
  const [isLoading, setIsLoading] = useState(false);
//isNil(roomStore.roomList)
  useEffect(() => {
    if( !roomStore.roomList){
      roomStore.fetchRooms(category)
        .then(
          (data: any) => {console.log(data)
          setIsLoading(false);
        })
    }
  },[])
  useEffect(() => {
    console.log("roomList: ", roomStore.roomList);
  },[roomStore.roomList])
  const handleClick = (value: any) => {
    
  }

  return(
    <section>
      <RoomContainer>
        {
          isLoading
            ? Array(10)
              .fill(0)
              .map((_, index) => {
                return <SkeletonCard key={`skeleton::${index}`} />;
              })
            : roomStore.roomList?.map((roomData: any,index: number) => 
              <Card
                data={roomData}
                key={`$::${index}-${category ?? "etc"}`}
                handleClick={() => handleClick(roomData)}
              />
            )
        }
      </RoomContainer>
    </section>
  )
}

TopicPage.initStoreOnServer = (req, { roomStore }) => {
  const { category } = req.params;
  return Promise.all([
    roomStore.fetchRooms(category),
  ])
}

export default observer(TopicPage);
