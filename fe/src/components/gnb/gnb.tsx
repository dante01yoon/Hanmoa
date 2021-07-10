import React, {
  FC,
  useState,
  createRef,
  useCallback,
  useEffect,
} from 'react';
import * as Styled from './style';
import { observer } from "mobx-react-lite";
import { useMobxStores, useToast } from "@utils/store/useStores";
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
import hanmoa_logo from 'src/asset/logo/logo.png';
import { Topic } from 'src/payload';

const {
  Header,
  Nav,
  ItemContainer,
  RightItemContainer,
  LeftItemContainer,
  LogoBox,
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
  const toast = useToast();
  const renderRightNav = () => {
    if (sessionStore.isSignedIn) {
      return (
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
              <LogoBox
                url={hanmoa_logo}
                height={63}
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