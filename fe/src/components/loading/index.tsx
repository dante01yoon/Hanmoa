import React, {FC, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import type { Theme } from "@theme/interface/theme";

const rotateAnimation = (props: {theme: Theme}) => keyframes`
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
  position?: Record<string,any>;
}>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;

  &:after {
    position: absolute;
    left: ${({position}) => (position && position.left) ?? "0"};
    right: ${({position}) => (position && position.right) ?? "0"};
    top: ${({position}) => (position && position.top) ?? "auto"};
    bottom: ${({position}) => (position && position.bottom) ?? "auto"};
    margin: auto;
    content: "";
    display: block;
    width: ${({width}) => width ? width : "100%"};
    height: ${({height}) => height ? height : "100%"};
    border-radius: 50%;
    border: 6px solid ${({theme}) => theme.colors.blue};
    border-color: ${({theme}) => theme.colors.blue} transparent ${({theme}) => theme.colors.blue} transparent;
    animation: ${rotateAnimation} 1.2s infinite linear;
    transform: translate(-50%, 0);
  }
`;


interface LoadingProps {
  isLoading?: boolean; 
  width?: string;
  height?: string;
  position?: Record<string,any>;
}

const Loading: FC<LoadingProps> = ({
  isLoading,
  width,
  height,
  position,
}) => {
  
  useEffect(() => {

  },[]);
  
  return(
    <StyledSelf 
      width={width} 
      height={height}
      position={position}
    />
  );
}

export default Loading;