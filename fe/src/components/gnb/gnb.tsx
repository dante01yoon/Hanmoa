import React, { 
  FC, 
  useState, 
  createRef 
} from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
import { topicDummy } from '@models/gnb';
import { buildTopicList } from '@utils/topic/buildtopicList';

import {ReactComponent as HanmoaLogo} from 'src/asset/logo/hanmoa_horizontal.svg';
import {ReactComponent as Hamburger} from 'src/asset/hamburger.svg';

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
    Topic,     
} = Styled;
export const Gnb:FC = () => {
    const [loginModal, setLoginModal] = useState(false);
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

    const openloginModal = () => {
        setLoginModal(true); 
    }
    const closeLoginModal = () =>{
        setLoginModal(false); 
    }
    return (
        <Header>
            <Nav>
                <ItemContainer>
                    <LeftItemContainer>
                            <SmartLink href={"/"}>
                                <ItemBox>
                                    {/* <HanmoaLogo/> */}
                                </ItemBox>
                            </SmartLink>
                            <ItemBox>
                                <TopicButton
                                  onClick={toggleTopicList}
                                >
                                    {/* <Hamburger/> */}
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