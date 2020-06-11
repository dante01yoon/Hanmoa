import React, { FC } from 'react';
import { iconMap, IconProps } from './chart';
import styled, { css } from 'styled-components';

export const IconBox = styled.div<{
  color?: string,
  size?: number 
}>`
  cursor:pointer;
  display:flex; 
  align-items: center;
  & svg{
      display:block;
      background-color: ${p => {
          const { color} = p 
          return css`${color}` 
      }};
      & > path {
      }
  }
      
`
interface Props {
  color?: string,
  size?: number,
  shape: keyof IconProps
  viewBox?: string,
  preserveAspectRatio?: string,
  scale?: number   
  clickHandler : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Icon: FC<Props>= ({
  color = '#000000',
  size = 24,
  shape,
  scale = 1.0,
  viewBox = `0 0 ${size} ${size}`,
  preserveAspectRatio = "none", 
  clickHandler
}) => {
  return(
    <IconBox 
      onClick={clickHandler}
    >
        <svg 
          width={`${size}px`} 
          height={`${size}px`} 
          fill={color} 
          preserveAspectRatio={preserveAspectRatio}
          viewBox={viewBox}
        >
          <path style={{transform:`scale(${scale})`}} d={iconMap[shape]} />
        </svg>
    </IconBox>
  )
}