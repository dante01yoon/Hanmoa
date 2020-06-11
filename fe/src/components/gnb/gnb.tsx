import React, { FC, useState, createRef, RefObject, useEffect, SyntheticEvent } from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
import { topicDummy } from '@models/gnb';
import { buildTopicList } from '@utils/topic/buildtopicList';


import HanmoaLogo from 'src/asset/logo/hanmoa_horizontal.svg';
import Hamburger from 'src/asset/hamburger.svg';

const { 
    Header,
    Nav,
    ItemContainer,
    RightItemContainer,
    LeftItemContainer,
    ItemList,
    Item,
    ItemBox,
    TopicButton,
    TopicTitle,
    TopicBox,
    TopicList,
    Topic     
} = Styled;

export const Gnb:FC = () => {
    const [visible, setVisible] = useState<boolean>(false); 
    const [topicList, setTopicList ] = useState(buildTopicList(topicDummy));
    const topicRef = createRef<HTMLDivElement>();
    const checkContain = (e: MouseEvent) => {
      if(e.target instanceof HTMLElement && (
        !topicRef.current?.contains( e.target )
      )){
        visible && setVisible(false);
        console.log(visible);
      }      
    };
    const toggleTopicList = () => {
      setVisible((visible) => !visible);
    }
    useEffect(() => {
      document.addEventListener('click',checkContain);
      return (() => document.removeEventListener('click', checkContain));
    },[]);
    return (
        <Header>
            <Nav>
                <ItemContainer>
                    <LeftItemContainer>
                            <SmartLink href={"/"}>
                                <ItemBox>
                                  <HanmoaLogo/>
                                </ItemBox>
                            </SmartLink>
                            <ItemBox>
                                <TopicButton
                                  onClick={toggleTopicList}
                                >
                                    <Hamburger/>
                                    <TopicTitle>토픽</TopicTitle>
                                </TopicButton>
                                <TopicBox
                                  visible={visible}
                                  ref={topicRef}
                                >
                                  {topicList}
                                </TopicBox>
                            </ItemBox>
                    </LeftItemContainer>
                    <RightItemContainer>
                        <ItemList>
                            <Item>
                                <SmartLink href={'login'}>
                                    로그인
                                </SmartLink>
                            </Item>
                            <Item>
                                <SmartLink href={'signup'}>
                                회원가입
                                </SmartLink>    
                            </Item>
                        </ItemList>
                    </RightItemContainer>
                </ItemContainer>
            </Nav>
        </Header>
    )
};