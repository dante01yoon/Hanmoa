import React from "react";
import styled, { keyframes, css } from "styled-components";
import {
    DummySkeletonColor,
    createSkeleteonAnimation,
} from "./skeletonAnimation";

const StyledUl = styled.ul`
  display: inline-block;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${(p) => p.theme.colors.gray_300};
  border-radius: 8px;

  & > li {
    &:first-child {
      float: left;

      & + li {
        float: right;
        max-width: 240px;

        & > h3 {
          margin-bottom: 32px;
        }
      }
    }
  }
`;

const StyledLi = styled.li`
  margin: 0 8px;
`;

const StyledImageBox = styled.p`
  display: inline-block;
  width: 48px;
  height: 48px;
  background-color: ${DummySkeletonColor};
  border-radius: 50%;
  ${createSkeleteonAnimation()}
`;
const StyledName = styled.h3`
  width: 72px;
  height: 16px;
  margin: 16px 8px;
  background-color: ${DummySkeletonColor};
  ${createSkeleteonAnimation()}
`;
const StyledChatContainer = styled.div``;

const StyledChatContentBox = styled.div`
  height: 56px;
  width: 160px;
  background-color: ${DummySkeletonColor};
  margin: 8px 0;
  ${createSkeleteonAnimation("30px")}
`;

const StyledDate = styled.div`
  width: 32px;
  height: 16px;
  background-color: ${DummySkeletonColor};
  ${createSkeleteonAnimation()}
`;

const renderSkeletonChatBox = (): JSX.Element => {
  return (
    <StyledChatContainer>
      <StyledName />
      <StyledChatContentBox />
      <StyledDate />
    </StyledChatContainer>
  );
};

const SkeletonCard: React.FC = ({}) => {
  return (
    <StyledUl>
      <StyledLi>
        <StyledImageBox />
      </StyledLi>
      <StyledLi>{renderSkeletonChatBox()}</StyledLi>
    </StyledUl>
  );
};

export default SkeletonCard;
