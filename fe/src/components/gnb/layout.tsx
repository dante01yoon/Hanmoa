import React , { FC } from 'react';
import * as Styled from './style';
import { Gnb } from './gnb';
import { Switch, BrowserRouter as Router } from "react-router-dom";

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
                <MainContainer >
                    {children}
                </MainContainer>            
            </Main>
        </>
    )
}