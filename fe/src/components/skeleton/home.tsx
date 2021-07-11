import React, { FC } from "react";
import styled from "styled-components";
import {
    createSkeleteonAnimation,
} from "./skeletonAnimation";

const StyledFigure = styled.figure`
    display:inline-block;
    width:296px;
    border: 1px solid ${p => p.theme.colors.gray_300};
    border-radius:8px;
    margin: 16px 24px;
`;
const StyledP = styled.p`
    content: "";
    display: block; 
    background-color: ${p => p.theme.colors.gray_200}; 
    width: 264px;
    height: 136px;
    border-radius: 8px;
    margin: 16px;
    ${createSkeleteonAnimation("64px")}
`;
const StyledFigCaption = styled.figcaption`
    width: 296px;
    height: 128px;
    padding:16px;
`;
const StyledFirstUl = styled.ul`
    display: flex;
    height: 24px;
    margin-bottom: 16px;
    
    & > li:first-child{
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 152px;
        margin-right: 16px;
        margin-left: 32px;
        ${createSkeleteonAnimation("40px")}
    }
    & > li:nth-child(2){
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 40px;
        margin-right: 32px;
        margin-left: 16px;
        ${createSkeleteonAnimation()}
    }
`;
const StyledLi = styled.li`
    
`
const StyledSecondUl = styled.ul`
    height: 40px;
    display: flex;
    margin-top: 16px;
     & > li:first-child{
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 136px;
        margin-left: 32px;
        margin-right: 32px;
        ${createSkeleteonAnimation()}
    }
    & > li:nth-child(2){
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 64px;
        margin-left: 32px;
        margin-right: 32px;
        ${createSkeleteonAnimation()}
    }
`
const HomeCard: FC = () => {
    return (
        <StyledFigure>
            <StyledP></StyledP>
            <StyledFigCaption>
                <StyledFirstUl>
                    <StyledLi></StyledLi>
                    <StyledLi></StyledLi>
                </StyledFirstUl>
                <StyledSecondUl>
                    <StyledLi></StyledLi>
                    <StyledLi></StyledLi>
                </StyledSecondUl>
            </StyledFigCaption>
        </StyledFigure>
    )
}

export default HomeCard;