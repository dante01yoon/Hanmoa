import React, { FC, useState } from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
import { Portal } from '@components/portal';
import LoginModal from '@components/login';
import HanmoaLogo from 'src/asset/logo/hanmoa_horizontal.svg';
const { 
    Header,
    Nav,
    ItemContainer,
    RightItemContainer,
    LeftItemContainer,
    ItemList,
    Item,
    ItemBox     
} = Styled;
export const Gnb:FC = () => {
    const [loginModal, setLoginModal] = useState(false);
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
                                    <HanmoaLogo/>
                                </ItemBox>
                            </SmartLink>
                            <SmartLink >
                                <ItemBox>
                                    Topic
                                </ItemBox>
                            </SmartLink>
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