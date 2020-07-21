import React, { FC } from "react";
import styled from "styled-components";
import {
    createSkeleteonAnimation,
} from "./skeletonAnimation";

const StyledFigure = styled.figure`
    display:inline-block;
    margin: 16px 24px;
    width:296px;
    border: 1px solid ${p=>p.theme.colors.gray_300};
    border-radius:8px;
`;
const StyledP = styled.p`
    margin: 16px;
    display: block; 
    content:"";
    width: 264px;
    height: 136px;
    background-color: ${p=>p.theme.colors.gray_200}; 
    border-radius: 8px;
    ${createSkeleteonAnimation("64px")}
`;
const StyledFigCaption = styled.figcaption`
    padding:16px;
    width: 296px;
    height: 128px;
`;
const StyledFirstUl = styled.ul`
    height: 24px;
    display: flex;
    margin-bottom: 16px;
    
    & > li:first-child{
        background-color: ${p=>p.theme.colors.gray_200}; 
        width: 152px;
        margin-left: 32px;
        margin-right: 16px;
        ${createSkeleteonAnimation("40px")}
    }
    & > li:nth-child(2){
        background-color: ${p=>p.theme.colors.gray_200}; 
        width: 40px;
        margin-left: 16px;
        margin-right: 32px;
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
        background-color: ${p=>p.theme.colors.gray_200}; 
        width: 136px;
        margin-left: 32px;
        margin-right: 32px;
        ${createSkeleteonAnimation()}
    }
    & > li:nth-child(2){
        background-color: ${p=>p.theme.colors.gray_200}; 
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