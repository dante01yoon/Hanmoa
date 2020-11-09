import React , { FC } from 'react';
import { observer } from "mobx-react-lite";
import * as Styled from './style';
import { Gnb } from './gnb';
import Cookies from "js-cookie"; 
import { useMobxStores } from "@utils/store/useStores";

const { 
    Main,
    Dummy,
    MainContainer
} = Styled;

const GlobalLayout:FC = ({
    children
}) => {
    const {sessionStore} = useMobxStores();
    const hmGuit = Cookies.get("_hm_guit");
    if( hmGuit ){
        sessionStore.update(hmGuit);
    }
    
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
};

export default observer(GlobalLayout);
