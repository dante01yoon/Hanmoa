import React, { FC, useRef } from "react";
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
}

const CreationSlider: FC<CreationSliderProps> = ({
  children,
  firstCardIndex,
  vectorX
}) => {

  return (
    <StyledSliderWrapper>
      <StyledSliderContainer vectorX={vectorX}>
        {children}
      </StyledSliderContainer>
    </StyledSliderWrapper>
  );
}

export default observer(CreationSlider);