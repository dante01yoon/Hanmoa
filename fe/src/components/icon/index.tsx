import React, { FC } from 'react';
<<<<<<< HEAD
import styled from 'styled-components';


export const Icon: FC = () => {
  return(
    <>
    </>
=======
import { iconMap, IconProps } from './chart';
import styled, { css } from 'styled-components';

export const IconBox = styled.div<{
  color?: string,
  size?: number 
}>`
  cursor:pointer;
  width: ${p => p.size}px;
  height:${p => p.size}px;
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
  clickHandler : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Icon: FC<Props>= ({
  color = '#000000',
  size = 24,
  shape,
  clickHandler
}) => {
  return(
    <IconBox 
      onClick={clickHandler}
    >
        <svg width={size} height={size} fill={color}>
            <path d={iconMap[shape]} />
        </svg>
    </IconBox>
>>>>>>> 352e02d65dc4b3a4b06d0f60c51c6eb27cdc3c2d
  )
}