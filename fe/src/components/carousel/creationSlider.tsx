import React, { FC, MutableRefObject, useRef } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const StyledSliderWrapper = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

const StyledSliderContainer = styled.div<{
  vectorX: number;
}>`
  transform: ${({ vectorX }) => `translateX(${vectorX}px)`};
  white-space: nowrap;
  transition: transform ease-in 0.3s;
`;

interface CreationSliderProps {
  firstCardIndex: number;
  vectorX: number;
  forwardRef: MutableRefObject<HTMLDivElement | null>
}

const CreationSlider: FC<CreationSliderProps> = ({
  children,
  firstCardIndex,
  vectorX,
  forwardRef,
}) => {

  return (
    <StyledSliderWrapper ref={forwardRef}>
      <StyledSliderContainer vectorX={vectorX}>
        {children}
      </StyledSliderContainer>
    </StyledSliderWrapper>
  );
}

export default observer(CreationSlider);