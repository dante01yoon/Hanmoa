import React, { FC, useEffect, useState, createRef } from 'react';
import styled from 'styled-components';
import { Indicator } from './indicator'; 
const Button = styled.button`
  position:absolute;
  top: 0;
  height:100%;
  all: unset; 
  border: 1px solid ${p => p.theme.colors.cyan};
  border-radius: 8px;
  background-color: ${p => p.theme.colors.cyan};
  cursor: pointer;
  opacity: 1;
  transition: all 0.4 ease-in;
  &:hover {
    opacity:1; 
  }
  background-color: yellow;
  &:first-child{
    left:0;
  }
  &:last-child{
    right: 0;
  }
`;
const SliderContainer = styled.div`
  width: 100%;
  position:relative;
`;
const Slider = styled.div`
  width:100%;
  overflow:hidden;
  display: flex;
`

export const Carousel: FC = ({
  children
}) => {
  const [count, setCount ] = useState<number>(0); 
  const slideRef = createRef<HTMLDivElement>(); 
  const total = React.Children.count(children); 
  const nextSlide = () => {
    if( count < total -1 ){
      setCount( count + 1 );
    } else if( count === total-1 ){
      setCount(1); 
    }
  }
  const prevSlide = () => {
    if( count > 0 ){
      setCount( count -1 );
    } else if( count === 0 ){
      setCount(total -1 );
    }
  }
  useEffect(()=> {
    if(slideRef.current){
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${count}00%)`;
    }
  },[count])
  return(
    <SliderContainer>
      <Slider ref={slideRef}>
        {children}      
      </Slider>
      <Indicator now={1} total={total}/>
      <Button onClick={prevSlide}>left</Button>
      <Button onClick={nextSlide}>right</Button>
    </SliderContainer>
  )
}