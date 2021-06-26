import React, { FC, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import * as Styled from './style';
import Gnb from './gnb';
import { useMobxStores } from "@utils/store/useStores";

const {
  Main,
  Dummy,
  MainContainer
} = Styled;

const GlobalLayout: FC = ({
  children
}) => {
  const { topicStore } = useMobxStores();

  useEffect(() => {
    if (!topicStore.topicList.length) {
      topicStore.fetchTopicList();
    }
  }, []);

  const renderGnb = () => {
    return (
      <Gnb topicList={topicStore.topicList} />
    )
  }

  return (
    <>
      {renderGnb()}
      <Dummy />
      <Main>
        <MainContainer >
          {children}
        </MainContainer>
      </Main>
    </>
  )
};

export default observer(GlobalLayout);
