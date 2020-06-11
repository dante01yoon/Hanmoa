import React, { FC, SyntheticEvent } from 'react';
import * as Styled from './style';

const {
  Wrapper,
  Button
} = Styled; 

interface ButtonProps{
  color?: string,
  size?: number,
  background?: string,
  clickHandler: (e: SyntheticEvent) => void 
}
export const BaseButton:FC<ButtonProps> = ({
  clickHandler,
  color='#ffffff',
  size=72,
  background='#FDF9F9',
  children
}) => {
  return(
    <Wrapper>
      <Button 
        onClick={clickHandler}
        background={background}
        color={color}
        size={size}
      >
        {children}
      </Button>
    </Wrapper>
  )  
}