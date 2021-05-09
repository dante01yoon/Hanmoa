import React, { FC, SyntheticEvent } from 'react';
import { noop } from 'rxjs';
import * as Styled from './style';

const {
  Wrapper,
  Button
} = Styled;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string,
  size?: number,
  background?: string,
  clickHandler?: (e: SyntheticEvent) => void
}
export const BaseButton: FC<ButtonProps> = ({
  clickHandler,
  color = '#ffffff',
  background = '#FDF9F9',
  children,
  size,
  ...restProps
}) => {
  return (
    <Wrapper>
      <Button
        onClick={clickHandler ?? noop}
        background={background}
        color={color}
        size={size}
        {...restProps}
      >
        {children}
      </Button>
    </Wrapper>
  )
}