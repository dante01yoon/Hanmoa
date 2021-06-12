import React, { FC, useRef, useEffect, useState, } from "react";
import { observer } from "mobx-react-lite";
import { debounce } from "lodash";
import styled, { css } from "styled-components";
import Card from "@components/card";
import CreationSlider from "./creationSlider";
import useResize from "@utils/carousel/windowResize";

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const size = useResize(sliderRef);

  const handleClickButton = (direction: "left" | "right") => () => {
    let stepToMove = 0;
    let pixelToMove = 300;

    if (direction === "left") {
      // right button action 
      const remainCounts = contents.length - firstCardIndex;
      if (remainCounts > 5) {
        stepToMove = 3;
      }
      else if (remainCounts === 5) {
        stepToMove = 2;
      }
      else if (remainCounts === 4) {
        stepToMove = 1;
      }
      else {
        stepToMove = 0;
      }
      setFirstCardIndex((prevFirstCardIndex) => prevFirstCardIndex + stepToMove);
      setVectorX((prevVectorX) => prevVectorX - pixelToMove * stepToMove);
    } else {
      // left button action
      const remainCounts = firstCardIndex;
      if (remainCounts > 2) {
        stepToMove = 3;
      }
      else if (remainCounts === 2) {
        stepToMove = 2;
      }
      else if (remainCounts === 1) {
        stepToMove = 1;
      }
      else {
        stepToMove = 0;
      }
      setVectorX((prevVectorX) => prevVectorX + pixelToMove * stepToMove);
      setFirstCardIndex((prevFirstCardIndex) => prevFirstCardIndex - stepToMove);
    }

  }

  const renderContents = (): Array<React.ReactNode> | React.ReactNode => {
    if (contents.length > 0) {
      return contents.map((room: any, idx: number) => <Card key={`$::${idx}`} room={room} handleClick={console.log} />);
    }
    return null;
  }

  useEffect(() => {
    window.addEventListener("resize", debounce(() => {
      setFirstCardIndex(0);
      setVectorX(0);
    }, 200));
  }, []);

  return (
    <StyledWrapper>
      <StyledLeftButton onClick={handleClickButton("right")}>{'<'}</StyledLeftButton>
      <StyledRightButton onClick={handleClickButton("left")}>{'>'}</StyledRightButton>
      <StyledContainer>
        <CreationSlider
          forwardRef={sliderRef}
          firstCardIndex={firstCardIndex}
          vectorX={vectorX}
        >
          {renderContents()}
        </CreationSlider>
      </StyledContainer>
    </StyledWrapper>
  )
}

export default observer(CreationCarousel);