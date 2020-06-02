import React, { FC } from 'react';
import * as Styled from './style';
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
                            <ItemBox>
                                <HanmoaLogo/>
                            </ItemBox>
                            <ItemBox>Topic</ItemBox>
                    </LeftItemContainer>
                    <RightItemContainer>
                        <ItemList>
                            <Item>로그인</Item>
                            <Item>회원가입</Item>
                        </ItemList>
                    </RightItemContainer>
                </ItemContainer>
            </Nav>
        </Header>
    )
};