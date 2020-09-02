import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStores from "@utils/store/useStores";
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

import adobe from "src/asset/adobe.jpg";
import netflix_phone from "src/asset/netflix_phone.jpg";
import netflix from "src/asset/netflix.jpg";

const { RoomContainer } = Styled;

const HomePage = withRouter(({ location: { pathname } }) => {
  // const [array, setArray] = useState([] as ReturnType<typeof dummyData> )
  const [isModal, setModal] = useModal();
  const { data, isLoading } = useSelector((state: RootState) => state.topic);
  const dispatch = useDispatch();
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
      <section>
        <RoomContainer>
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
});

export default HomePage;
