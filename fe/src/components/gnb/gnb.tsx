import React, {
  FC,
  useState,
  createRef,
  useCallback,
  useEffect,
} from 'react';
import * as Styled from './style';
import { observer } from "mobx-react";
import { useMobxStores } from "@utils/store/useStores";
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
import hanmoa_logo from 'src/asset/logo/hanmoa_horizontal.svg';
import { Topic } from 'src/payload';

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
  TopicLink,
} = Styled;

interface GnbProps {
  topicList: Topic[];
}

const Gnb: FC<GnbProps> = ({
  topicList,
}) => {
  const [loginModal, setLoginModal] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const topicRef = createRef<HTMLDivElement>();
  const { sessionStore, http, topicStore, roomStore } = useMobxStores();

  const checkContain = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (!topicRef.current?.contains(e.target)) {
        visible ? setVisible(false) : null;
      }
    }
  };

  const handleToggleTopicList = () => {
    setVisible(!visible);
  }

  const openloginModal = () => {
    setLoginModal(true);
  }

  const closeLoginModal = () => {
    setLoginModal(false);
  }

  const handleLogoutClick = () => {
    sessionStore.fetchSignOut();
  }

  const handleCreateRoom = () => {

  }

  const renderTopicList = useCallback(() => {
    const topicRowGroup = [] as JSX.Element[];

    for (let i = 0; i < topicList.length / 3 + 1; i += 1) {
      const start = i * 3;
      const end = (start + 2 < topicList.length - 1) ?
        start + 3 :
        undefined;

      topicRowGroup.push(
        <TopicList>
          {
            topicList.slice(i * 3, end).map((topic) => (
              <TopicLink key={topic.url} to={`/topic/${topic.url}`}>{topic.category}</TopicLink>
            ))
          }
        </TopicList>
      )
    }

    return topicRowGroup;
  }, [topicList])

  const renderRightNav = () => {
    if (sessionStore.isSignedIn) {
      return (
        <>
          <Item onClick={async () => {
            // const data = await fetch("http://localhost:5001/api/room/roommate?page=0", { credentials: "include" });
            const data = await roomStore.fetchRooms("ktx");
            // const data = await http.GET("http://localhost:5001/api/room/roommate?page=0");
            console.log(data)
          }}>
            테스트
            {/* <SmartLink href="/createRoom">방 만들기</SmartLink> */}
          </Item>
          <Item>
            <SmartLink href="/createRoom">방 만들기</SmartLink>
          </Item>
          <Item>마이페이지</Item>
          <Item onClick={handleLogoutClick}>로그아웃</Item>
        </>
      )
    }
    else {
      return (
        <>
          <Item >
            <SmartLink href="login">
              로그인
              </SmartLink>
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
                onClick={handleToggleTopicList}
              >
                <TopicTitle>토픽</TopicTitle>
              </TopicButton>
              {visible && (
                <TopicBox
                  ref={topicRef}
                >
                  {renderTopicList()}
                </TopicBox>
              )
              }
            </ItemBox>
          </LeftItemContainer>
          <RightItemContainer>
            <ItemList>{renderRightNav()}</ItemList>
          </RightItemContainer>
          {loginModal &&
            <Portal>
              <LoginModal closeModal={closeLoginModal} />
            </Portal>
          }
        </ItemContainer>
      </Nav>
    </Header>
  )
};

export default observer(Gnb);