import React, { useEffect, useRef, FC } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/index";
import { getTopicActions } from "@store/actions";
import * as Styled from "./style";
import { Carousel } from "@components/carousel";
import { Slide } from "@components/carousel/slide";
import { Card } from "@components/card";
import SkeletonCard from "@components/skeleton/home";
import { Modal } from "src/components/modal";
import { ICardData } from "src/models/card";
import { useModal } from "@utils/modal/useModal";
import { pathExtractor } from "@utils/topic/pathExtractor";
import {useMobxStores, MobxStores} from "@utils/store/useStores"; 
import {observer} from "mobx-react";
import adobe from "src/asset/adobe.jpg";
import netflix_phone from "src/asset/netflix_phone.jpg";
import netflix from "src/asset/netflix.jpg";

const { RoomContainer } = Styled;

type InitStoreOnServer<S = Partial<MobxStores> > = (req: Express.Request, stores: S) => {
  
}
interface HomePageInitStoreOnServer {
  initStoreOnServer: InitStoreOnServer<{
    topicStore: MobxStores["topicStore"];
  }>
}

const HomePage: FC & HomePageInitStoreOnServer = ({}) => {
  const [isModal, setModal] = useModal();
  const { pathname } = useLocation();
  const homeRef = useRef<HTMLUListElement>(null);
  const { data, isLoading } = useSelector((state: RootState) => state.topic);
  const dispatch = useDispatch();
  const { sessionStore, chatStore, topicStore } = useMobxStores();

  
  useEffect(() => {
    const [include, exclude] = pathExtractor(pathname);
    dispatch(getTopicActions.REQUEST());
  }, []);
  
  const handleClick: (data: ICardData) => void = (data) => {
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
      <section>{isModal.visible && <Modal data={isModal.data} />}</section>
      <section >
        <RoomContainer ref={homeRef}>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => {
                  return <SkeletonCard key={`skeleton::${index}`} />;
                })
            : data.map((value) => {
                return (
                  <Card
                    data={value}
                    key={value.id}
                    handleClick={() => handleClick(value)}
                  />
                );
              })}
        </RoomContainer>
      </section>
    </>
  );
};

HomePage.initStoreOnServer = (_,{ topicStore }) => {
  return Promise.all([
    topicStore.fetchTopicList(),
  ])
}
export default observer(HomePage);

