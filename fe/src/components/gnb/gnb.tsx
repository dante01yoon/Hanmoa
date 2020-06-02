import React, { FC } from 'react';
import * as Styled from './style';
import { SmartLink } from '@components/smartlink';
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