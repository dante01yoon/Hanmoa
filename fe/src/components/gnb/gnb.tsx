import React, { 
  FC, 
  useState, 
  createRef,
  useEffect,
} from 'react';
import * as Styled from './style';
import { observer } from "mobx-react";
import { useMobxStores } from "@utils/store/useStores"; 
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
import { topicDummy } from '@models/gnb';
import { buildTopicList } from '@utils/topic/buildtopicList';
import hanmoa_logo from 'src/asset/logo/hanmoa_horizontal.svg';

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

interface GnbProps {
  topicList: any[];
}

const Gnb:FC<GnbProps> = ({
  topicList,
}) => {
    const [loginModal, setLoginModal] = useState(false);
    const [visible, setVisible] = useState<boolean>(false); 
    const topicRef = createRef<HTMLDivElement>();
    const {sessionStore} = useMobxStores();
    
    const checkContain = (e: MouseEvent) => {
      if(e.target instanceof HTMLElement){
        if(!topicRef.current?.contains( e.target )){
          visible ? setVisible(false) : null;
        }
      }      
    };

    useEffect(() => {
      console.log("topicList: ", topicList);
    });

    const toggleTopicList = () => {
      setVisible((visible) => !visible);
    }

    const openloginModal = () => {
      setLoginModal(true); 
    }
    
    const closeLoginModal = () =>{
      setLoginModal(false); 
    }
    
    const handleLogoutClick = () => {
      sessionStore.fetchSignOut();
    }

    const handleCreateRoom = () => {
      
    }
    
    const renderRightNav = () => {
      if(sessionStore.isSignedIn){
        return(
          <>
            <Item>
              <SmartLink href="/createRoom">방 만들기</SmartLink>
            </Item>
            <Item>마이페이지</Item>
            <Item onClick={handleLogoutClick}>로그아웃</Item>
          </>
        )
      }
      else {
        return(
          <>
            <Item >
              <SmartLink href="login">
                로그인
              </SmartLink>
            </Item>
            <Item onClick={() => sessionStore.fetch()}>
              회원가입
              {/* <SmartLink href={'signup'}>
                회원가입
              </SmartLink>     */}
            </Item> 
          </>
        )
      }
    }

    return (
      <Header>
        <Nav>
          <ItemContainer>
            <LeftItemContainer>
              <SmartLink href={"/"}>
                <ItemBox
                    url={hanmoa_logo}
                    width={192}
                />
              </SmartLink>
              <ItemBox>
                <TopicButton
                  onClick={toggleTopicList}
                >
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
              <ItemList>{renderRightNav()}</ItemList>
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

export default observer(Gnb);