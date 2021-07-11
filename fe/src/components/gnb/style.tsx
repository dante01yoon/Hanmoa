import styled from 'styled-components';
import hamburger from 'src/asset/hamburger.svg';
import { Link } from "react-router-dom";

const smallDevice = "780";

export const Main = styled.main`
  clear: both;
`;

export const Dummy = styled.div`
  height: 64px;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 500; 
  background-color: ${p => p.theme.colors.background_black};
  width:100%;
  ${p => p.theme.typography._16Bold};
`
export const Nav = styled.nav`
  line-height: 64px;
  width:100%;
  height: 64px;

  @media (max-width: ${smallDevice}px) {
    height: 128px;
  }
`;

export const LogoBox = styled.div<{
  url?: string
  height: number
}>`
  position:relative;
  width: 100px;
  height: ${({ height }) => height}px;
  margin: 0 16px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    left: -6px;
    background-image: url(${({ url }) => url});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 126px;
    height: 64px;
  }
`;

export const ItemBox = styled.div<{
  url?: string
  width?: number
}>`
  display:flex;
  align-items:center;
  margin: 0 16px;

  &::after {
    content: "";
    display: block;
    background: center url("${p => p.url}");
    width: ${p => p.width ? p.width + 'px' : '64px'}; 
    height:63px;
  }

  @media (max-width: ${smallDevice}px) {
    &::after {
      display: none;
    }
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

  @media (max-width: ${smallDevice}px) {
    text-align: center;
  }
`;

export const ItemContainer = styled.div`
  max-width: 1280px;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_300}; 
  margin: 0 auto;
`;

export const LeftItemContainer = styled.div`
  display: inline-flex;
  margin-right:0;
  margin-left: 64px;

  @media (max-width: ${smallDevice}px) {
    display: flex;
    justify-content: space-between;
    margin-left: 0;
  }
`
export const RightItemContainer = styled.div`
  float:right;
  margin-right: 64px; 

  @media ( max-width: ${smallDevice}px) {
    float: initial;
    margin: 0;
  }
`

export const MainContainer = styled.div`
  position:relative;
  max-width: 1280px;
  margin: 0 auto;
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
    content:"";
    display:block;
    background: center url("${hamburger}");
    width:24px;
    height:32px;
  }

  @media (max-width: ${smallDevice}px) {
    width: 100%;
    margin-left: 30px;
  }
`;

export const TopicTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height:40px;
  height:100%;
  margin-right: 8px;
`;

export const TopicBox = styled.div<{
}>`
  position: absolute;
  top: 56px;
  background-color: ${p => p.theme.colors.white};
  max-width: 528px;
  max-height:216px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 16px;
  overflow-y: auto; 

  @media (max-width: ${smallDevice}px) {
    position: fixed;
    left: 0;
    width: 100%;
  }
`;

export const TopicList = styled.div`
  display:flex;

  @media (max-width: ${smallDevice}px) {
  }
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

  @media (max-width: ${smallDevice}px) {
    width: 100%;
  }
`;