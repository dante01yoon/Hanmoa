import React, { FC, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled, { css } from "styled-components";

const breakPoints = [360, 600, 1100];

const StyledWrapper = styled.div`
  position: relative;
`;

const buttonStyle = () => css`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray};
  line-height: 70px;
  text-align: center;
  width: 30px;
  height: 70px;
  opacity: 0.4;
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

const StyledRightButton = styled.div`
  ${buttonStyle}
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const StyledLeftButton = styled.div`
  ${buttonStyle}
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const StyledSlider = styled.div`
  
`;

interface CreationCarouselProps {
  contents?: any;
}

const CreationCarousel: FC<CreationCarouselProps> = ({
  contents = [],
}) => {

  const handleClickButton = (direction: "left" | "right") => () => {
    if (direction === "left") {
      // left button action 
    } else {
      // right button action
    }

  }

  const renderContents = (): Array<React.ReactNode> | React.ReactNode => {
    if (contents.length > 0) {
      return null;
    }
    return null;
  }

  return (
    <StyledWrapper>
      <StyledLeftButton onClick={handleClickButton("left")}>{'<'}</StyledLeftButton>
      <StyledRightButton onClick={handleClickButton("right")}>{'>'}</StyledRightButton>
      <StyledSlider>{renderContents}</StyledSlider>
    </StyledWrapper>
  )
}

export default observer(CreationCarousel);