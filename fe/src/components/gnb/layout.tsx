import React , { FC, useEffect } from 'react';
import { observer } from "mobx-react";
import * as Styled from './style';
import Gnb from './gnb';

const { 
    Main,
    Dummy,
    MainContainer
} = Styled;

const GlobalLayout:FC = ({
    children
}) => {
  useEffect(() => {
    console.log("rerender in Layout");
  })
  return(
  <>
    <Gnb/>
    <Dummy/>
    <Main>
      <MainContainer >
        {children}
      </MainContainer>            
    </Main>
  </>
  )
};

export default observer(GlobalLayout);
