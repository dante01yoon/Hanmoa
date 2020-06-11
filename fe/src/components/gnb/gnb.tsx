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
    const topicRef = createRef<HTMLDivElement>();
    const checkContain = (e: MouseEvent) => {
      console.log('hello checkContain');
      if(e.target instanceof HTMLElement && 
        !topicRef.current?.contains( e.target )){
        console.log('where am I ? ', e.target);

        visible && setVisible(false);
      }      
    };
    const toggleTopicList = () => {
      !visible && setVisible(true);
      console.log('hello toggleTopicList');  
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
                                <TopicButton>
                                    <Hamburger/>
                                    <TopicTitle>토픽</TopicTitle>
                                </TopicButton>
                                <TopicBox
                                  visible={visible}
                                  ref={topicRef}
                                  onClick={toggleTopicList}
                                >
                                  {buildTopicList(topicDummy)}
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