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

                    </LeftItemContainer>
                    <RightItemContainer>
                        
                    </RightItemContainer>
                </ItemContainer>
            </Nav>
        </Header>
    )
};