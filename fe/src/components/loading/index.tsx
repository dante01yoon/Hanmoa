import React, { FC, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import type { Theme } from "@theme/interface/theme";

const rotateAnimation = (props: { theme: Theme }) => keyframes`
   0%{
     transform: rotate(0deg);
   }

   50%{
    border-color: ${props.theme.colors.dark_sky_blue} transparent ${props.theme.colors.dark_sky_blue} transparent;
   }

   100% {
     transform: rotate(360deg);
     border-color: ${props.theme.colors.blue} transparent ${props.theme.colors.blue} transparent;
   }
`;

const StyledSelf = styled.div<{
  width?: string;
  height?: string;
  position?: Record<string, any>;
}>`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: ${({ position }) => (position && position.top) ?? "auto"};
    right: ${({ position }) => (position && position.right) ?? "0"};
    bottom: ${({ position }) => (position && position.bottom) ?? "auto"};
    left: ${({ position }) => (position && position.left) ?? "0"};
    transform: translate(-50%, -50%);
    width: ${({ width }) => width ? width : "100%"};
    height: ${({ height }) => height ? height : "100%"};
    border: 3px solid ${({ theme }) => theme.colors.blue};
    border-color: ${({ theme }) => theme.colors.blue} transparent ${({ theme }) => theme.colors.blue} transparent;
    border-radius: 50%;
    margin: auto;
    animation: ${rotateAnimation} 1.2s infinite linear;
  }
`;


export interface LoadingProps {
  isLoading?: boolean;
  width?: string;
  height?: string;
  position?: Record<string, any>;
}

const Loading: FC<LoadingProps> = ({
  isLoading,
  width,
  height,
  position,
}) => {

  return (
    <StyledSelf
      width={width}
      height={height}
      position={position}
    />
  );
}

export default Loading;