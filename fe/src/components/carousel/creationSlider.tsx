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
`;

interface CreationSliderProps {
  firstCardIndex: number;
}

const CreationSlider: FC<CreationSliderProps> = ({
  children,
  firstCardIndex,
}) => {

  return (
    <StyledSliderWrapper>
      <StyledSliderContainer vectorX={-120}>
        {children}
      </StyledSliderContainer>
    </StyledSliderWrapper>
  );
}

export default observer(CreationSlider);