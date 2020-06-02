import React , { FC } from 'react';
import * as Styled from './style';
import { Gnb } from './gnb';
const { 
    Main 
} = Styled;

export const GlobalLayout:FC = ({
    children
}) => {
    return(
        <>
            <Gnb/>
            <Main>
                {children}            
            </Main>
        </>
    )
}