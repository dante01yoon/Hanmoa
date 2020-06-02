import React, { FC } from 'react';
import * as Styled from './style';

const { 
    Header,
    Nav,
    ItemContainer,
    RightItemContainer,
    LeftItemContainer,
    ItemList,
    Item     
} = Styled;

export const Gnb:FC = () => {
    return (
        <Header>
            <Nav>
                <ItemContainer>
                    <LeftItemContainer>
                        <ItemList>
                            <Item>Logo</Item>
                            <Item>Topic</Item>
                        </ItemList>
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