<<<<<<< HEAD
import React, { FC, useState } from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
=======
import React, { FC, useState, createRef, RefObject, useEffect, SyntheticEvent } from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
import { topicDummy } from '@models/gnb';
import { buildTopicList } from '@utils/topic/buildtopicList';


>>>>>>> c8539cbabd9cbe2b4e7efda88a39fa3a8a95d489
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
<<<<<<< HEAD
    const [loginModal, setLoginModal] = useState(false);
    const openloginModal = () => {
        setLoginModal(true); 
    }
    const closeLoginModal = () =>{
        setLoginModal(false); 
    }
=======
    const [visible, setVisible] = useState<boolean>(false); 
    const [topicList, setTopicList ] = useState(buildTopicList(topicDummy,setVisible));
    const topicRef = createRef<HTMLDivElement>();
    const checkContain = (e: MouseEvent) => {
      if(e.target instanceof HTMLElement){
        if(!topicRef.current?.contains( e.target )){
          visible ? setVisible(false) : null;
        }
      }      
    };
    const toggleTopicList = () => {
      setVisible((visible) => !visible);
    }
    useEffect(() => {
      console.log(topicList);
      document.addEventListener('click',checkContain);
      return (() => document.removeEventListener('click', checkContain));
    },[]);
>>>>>>> c8539cbabd9cbe2b4e7efda88a39fa3a8a95d489
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
                                { visible && 
                                  <TopicBox
                                    ref={topicRef}
                                  >
                                    {topicList}
                                  </TopicBox>
                                }
                            </ItemBox>
                    </LeftItemContainer>
                    <RightItemContainer>
                        <ItemList>
                            <Item onClick={openloginModal}>
                                로그인
                            </Item>
                            <Item>
                                <SmartLink href={'signup'}>
                                회원가입
                                </SmartLink>    
                            </Item>
                        </ItemList>
                    </RightItemContainer>
                    { loginModal &&
                        <Portal>
                            <LoginModal closeModal={closeLoginModal}/>
                        </Portal>
                    }
                </ItemContainer>
            </Nav>
        </Header>
    )
};