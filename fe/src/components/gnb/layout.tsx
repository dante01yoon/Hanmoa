import React , { FC } from 'react';
import * as Styled from './style';
import { Gnb } from './gnb';
const { 
    Main,
    Dummy,
    MainContainer
} = Styled;

export const GlobalLayout:FC = ({
    children
}) => {
    return(
        <>
            <Gnb/>
            <Dummy/>
            <Main>
                <MainContainer>
                    {children}
                </MainContainer>            
            </Main>
        </>
    )
}