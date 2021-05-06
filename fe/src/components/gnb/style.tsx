import styled from 'styled-components';
import hamburger from 'src/asset/hamburger.svg';
import { Link } from "react-router-dom";

export const Main = styled.main`
  clear: both;
`;

export const Dummy = styled.div`
  height: 64px;
`;

export const Header = styled.header`
  background-color: ${p => p.theme.colors.background_black};
  z-index: 500; 
  position: fixed;
  top: 0;
  width:100%;
  ${p => p.theme.typography._16Bold};
`
export const Nav = styled.nav`
  width:100%;
  line-height: 64px;
  height: 64px;
`;

export const ItemBox = styled.div<{
  url?: string
  width?: number
}>`
  display:flex;
  align-items:center;
  margin: 0 16px;
  
  &::after {
    display: block;
    content: "";
    height:63px;
    width: ${p => p.width ? p.width + 'px' : '64px'}; 
    background: center url("${p => p.url}");
  }
`;

export const Item = styled.li`
  color: ${({ theme }) => theme.colors.gray_white};
  text-transform: uppercase;
  padding: 0 8px;
  cursor:pointer; 
`;

export const ItemList = styled.ul`
  & > ${Item} {
    display: inline-block;    
  }
`;

export const ItemContainer = styled.div`
  height: 64px;
  max-width: 1280px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_300}; 
  margin: 0 auto;
`;

export const LeftItemContainer = styled.div`
  display: inline-flex;
  margin-left: 64px;
  margin-right:0;

`
export const RightItemContainer = styled.div`
  margin-right: 64px; 
  float:right;
`

export const MainContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position:relative;
`;

export const TopicButton = styled.button`
  display:flex;
  align-items:center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray_white};
  height:40px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  outline: 0; 

  &:focus{
    box-shadow: 0 0 0 0.2rem rgba(237,102,83,.25);
  }
  
  &::after{
    display:block;
    content:"";
    background: center url("${hamburger}");
    width:24px;
    height:32px;
  }
`;

export const TopicTitle = styled.span`
  margin-right: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height:40px;
  height:100%;
`;

export const TopicBox = styled.div<{
}>`
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 16px;
  position: absolute;
  top: 56px;
  background-color: ${p => p.theme.colors.white};
  max-width: 528px;
  max-height:216px;
  overflow-y: auto; 
`;

export const TopicList = styled.div`
  display:flex;
`;

export const TopicLink = styled(Link)`
  display:flex;
  justify-content:center;
  align-items:center;
  font-size: 12px;
  line-height: initial;
  width: 108px;
  height: 40px;
  padding: 8px 0; 
  cursor: pointer; 
  
  &:hover, :focus {
    background-color: ${p => p.theme.colors.gray_100};
  }
`;