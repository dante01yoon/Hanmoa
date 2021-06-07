import React, { FC, useRef } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const StyledSliderWrapper = styled.div`
  overflow: hidden;
`;

const StyledSliderContainer = styled.div`
  white-space: nowrap;
`;

interface CreationSliderProps {
}

const CreationSlider: FC<CreationSliderProps> = ({
  children,
}) => {

  return (
    <StyledSliderWrapper>
      <StyledSliderContainer>
        {children}
      </StyledSliderContainer>
    </StyledSliderWrapper>
  );
}

export default observer(CreationSlider);