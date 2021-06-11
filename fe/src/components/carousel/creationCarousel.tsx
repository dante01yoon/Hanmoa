import React, { FC, useRef, useEffect, useState, } from "react";
import { observer } from "mobx-react-lite";
import styled, { css } from "styled-components";
import Card from "@components/card";
import CreationSlider from "./creationSlider";

const breakPoints = [360, 600, 1100];

const StyledWrapper = styled.div`
  position: relative;
`;

const buttonStyle = () => css`
  position: absolute;
  z-index: 1;
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
  left: 8px;
  transform: translateY(-50%);
`;

const StyledContainer = styled.div`
  
`;

interface CreationCarouselProps {
  contents?: any;
}

const CreationCarousel: FC<CreationCarouselProps> = ({
  contents = [],
}) => {
  const [firstCardIndex, setFirstCardIndex] = useState(0)
  const [vectorX, setVectorX] = useState(0);

  const handleClickButton = (direction: "left" | "right") => () => {
    if (direction === "left") {
      // left button action 
      setFirstCardIndex((prevFirstCardIndex) => prevFirstCardIndex + 3);
      setVectorX((prevVectorX) => prevVectorX - 300 * (firstCardIndex / 3 + 1));
    } else {
      // right button action
      setVectorX((prevVectorX) => prevVectorX + 300 * (firstCardIndex / 3 + 1));
      setFirstCardIndex((prevFirstCardIndex) => prevFirstCardIndex - 3);
    }

  }

  const renderContents = (): Array<React.ReactNode> | React.ReactNode => {
    if (contents.length > 0) {
      return contents.map((room: any, idx: number) => <Card key={`$::${idx}`} room={room} handleClick={console.log} />);
    }
    return null;
  }

  return (
    <StyledWrapper>
      <StyledLeftButton onClick={handleClickButton("left")}>{'<'}</StyledLeftButton>
      <StyledRightButton onClick={handleClickButton("right")}>{'>'}</StyledRightButton>
      <StyledContainer>
        <CreationSlider firstCardIndex={firstCardIndex} vectorX={vectorX}>
          {renderContents()}
        </CreationSlider>
      </StyledContainer>
    </StyledWrapper>
  )
}

export default observer(CreationCarousel);