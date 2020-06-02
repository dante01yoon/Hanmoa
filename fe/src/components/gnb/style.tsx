import styled from 'styled-components';
import HanmoaLogo from 'src/asset/logo/hanmoa_horizontal.svg';
export const Main = styled.main`
    both: clear;
`;
export const Dummy = styled.div`
    height: 88px;
`;
export const Header = styled.header`
    z-index: 500; 
    position: fixed;
    top: 0;
    width:100%;
    background-color: ${p=> p.theme.colors.white};
    ${p=>p.theme.typography._16Bold};
`
export const Nav = styled.nav`
    width:100%;
    line-height: 64px;
    height: 64px;
`;
export const ItemBox = styled.div`
    display:flex;
    margin: 0 16px;
`;
export const Item = styled.li`
    padding: 0 8px;
    text-transform: uppercase;
    cursor:pointer; 
`;
export const ItemList= styled.ul`
    & > ${Item} {
        display: inline-block;          
    }
`;

export const ItemContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`;
export const LeftItemContainer = styled.div`
    display: inline-flex;
    margin-left: 64px;

`
export const RightItemContainer = styled.div`
    margin-right: 64px; 
    float:right;
`
export const MainContainer = styled.div`
    max-width: 1280px;
    height:100vh;
    margin: 0 auto;
    position:relative;
`;
